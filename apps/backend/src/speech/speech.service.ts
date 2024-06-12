import {
  HttpException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { SpeechClient } from './speech.client';
import { SpeechStorage } from './speech.storage';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySearchSpeechDto } from './dto/query-search-speech.dto';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { $Enums, Prisma } from '@prisma/client';
import { ApiErrors } from 'src/errors/api-error';
import { MultipartFile } from '@fastify/multipart';
import { v4 } from 'uuid';
import { ModuleRef } from '@nestjs/core';
import { UpdateSpeechDto } from './dto/update-speech.dto';
import axios from 'axios';

@Injectable()
export class SpeechService implements OnApplicationBootstrap {
  constructor(
    private readonly speechClient: SpeechClient,
    private readonly speechStorage: SpeechStorage,
    private prisma: PrismaService,
    private moduleRef: ModuleRef,
  ) {}

  async onApplicationBootstrap() {
    await this.processSpeech(this.moduleRef.get(PrismaService));
  }

  async recognize(
    file: MultipartFile,
    fileData: { compressionType: 'pcmu' | 'pcma'; rate: number },
  ) {
    const newFileName = v4();

    await this.speechStorage.upload(file, newFileName);

    const prismaResult = await this.prisma.speech.create({
      data: {
        sampleRate: fileData.rate,
        compression: fileData.compressionType,
        fileName: newFileName + '.wav',
      },
    });

    return prismaResult;
  }

  async querySearch(queries: QuerySearchSpeechDto) {
    const findManyOptions: Prisma.SpeechFindManyArgs = {
      where: {
        createdAt: {
          gte: queries.startDate ? new Date(queries.startDate) : undefined,
          lte: queries.endDate ? new Date(queries.endDate) : undefined,
        },
        status: queries.status,
        compression: queries.compression,
      },
      skip: queries.offset,
      take: queries.limit,
    };

    const searchParams = PrismaService.getPrismaSearchingProperties(
      queries.getSearchingProperties(),
    );

    if (searchParams.length || queries.id)
      findManyOptions.where.OR = [
        ...searchParams,
        {
          id: BetterBigInt(queries.id),
        },
      ];

    if (queries.orderBy && queries.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[queries.orderBy, queries.orderDirection]]),
      ];
    }

    const [data, count] = await this.prisma.$transaction([
      this.prisma.speech.findMany(findManyOptions),
      this.prisma.speech.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data,
    };
  }

  async delete(id: bigint) {
    const speech = await this.prisma.speech.findUnique({
      where: {
        id,
      },
    });

    if (!speech) throw new HttpException(ApiErrors.speech.notFound.id, 404);

    await this.speechStorage.delete(speech.fileName);

    return await this.prisma.speech.delete({
      where: {
        id,
      },
    });
  }

  async processSpeech(prisma: PrismaService) {
    const speeches = await prisma.speech.findMany({
      where: {
        status: $Enums.SpeechStatus.NEW,
      },
    });

    for (let i = 0; i < speeches.length; i++) {
      try {
        const buffer = await this.speechStorage.readFile(speeches[i].fileName);
        const result = await this.speechClient.recognize(buffer, {
          compressionType: speeches[i].compression,
          sampleRate: speeches[i].sampleRate,
        });

        await prisma.speech.update({
          where: {
            id: speeches[i].id,
          },
          data: {
            apiResult: JSON.stringify(result.data),
            recognizedText: result.data.result.join(' '),
            status: $Enums.SpeechStatus.DONE,
            recognizedDate: new Date().toISOString(),
          },
        });
      } catch (error) {
        await prisma.speech.update({
          where: {
            id: speeches[i].id,
          },
          data: {
            apiResult: axios.isAxiosError(error)
              ? JSON.stringify({
                  data: error.response && error.response.data,
                  message: error.message,
                })
              : JSON.stringify({ message: error.message }),
            status: $Enums.SpeechStatus.ERROR,
          },
        });
      }
    }

    setTimeout(() => {
      this.processSpeech(prisma);
    }, 500);
  }

  async update(id: bigint, dto: UpdateSpeechDto) {
    const speech = await this.prisma.speech.findUnique({
      where: {
        id,
      },
    });

    if (!speech) throw new HttpException(ApiErrors.speech.notFound.id, 404);

    return await this.prisma.speech.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
