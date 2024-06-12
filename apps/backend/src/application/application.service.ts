import {
  HttpException,
  Injectable,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiErrors } from '../errors/api-error';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { QuerySearchApplicationDto } from './dto/query-search-application.dto';
import { Prisma } from '@prisma/client';
import { ApplicationStorage } from './application.storage';
import { MultipartFile } from '@fastify/multipart';
import { FileLimitError } from './errors/file-limit';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly applicationStorage: ApplicationStorage,
  ) {}

  async querySearch(queries: QuerySearchApplicationDto) {
    const findManyOptions: Prisma.ApplicationFindManyArgs = {
      where: {
        createdAt: {
          gte: queries.startDate ? new Date(queries.startDate) : undefined,
          lte: queries.endDate ? new Date(queries.endDate) : undefined,
        },
      },
      skip: queries.offset,
      take: queries.limit,
    };

    const searchParams = PrismaService.getPrismaSearchingProperties(
      queries.getSearchingProperties(),
    );

    if (searchParams.length) findManyOptions.where.OR = searchParams;

    if (queries.orderBy && queries.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[queries.orderBy, queries.orderDirection]]),
      ];
    }

    const [applications, count] = await this.prisma.$transaction([
      this.prisma.application.findMany(findManyOptions),
      this.prisma.application.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data: applications,
    };
  }

  async create(dto: CreateApplicationDto) {
    const app = await this.prisma.application.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (app) throw new HttpException(ApiErrors.application.unique.name, 400);

    await this.applicationStorage.create(dto.name);

    return await this.prisma.application.create({
      data: {
        name: dto.name,
      },
    });
  }

  async update(oldName: string, { name: newName }: UpdateApplicationDto) {
    const appToUpdate = await this.prisma.application.findUnique({
      where: {
        name: oldName,
      },
    });

    if (!appToUpdate)
      throw new HttpException(ApiErrors.application.notFound.name, 404);

    const appWithTheSameName = await this.prisma.application.findUnique({
      where: {
        name: newName,
      },
    });

    if (appWithTheSameName)
      throw new HttpException(ApiErrors.application.unique.name, 400);

    await this.applicationStorage.update(oldName, newName);

    return this.prisma.application.update({
      data: {
        name: newName,
      },
      where: {
        name: oldName,
      },
    });
  }

  async delete(name: string) {
    const appToDelete = await this.prisma.application.findUnique({
      where: {
        name,
      },
    });

    if (!appToDelete)
      throw new HttpException(ApiErrors.application.notFound.name, 404);

    await this.applicationStorage.delete(name);

    return await this.prisma.application.delete({
      where: {
        name,
      },
    });
  }

  async upload(name: string, dataToUpload: MultipartFile) {
    const app = await this.prisma.application.findUnique({
      where: {
        name,
      },
    });

    if (!app) throw new HttpException(ApiErrors.application.notFound.name, 404);

    if (
      dataToUpload.mimetype !== 'application/x-gzip' &&
      dataToUpload.mimetype !== 'application/x-tar'
    )
      throw new UnsupportedMediaTypeException(
        'File type is different than expected. Expected: application/x-tar, application/x-gzip',
      );

    const error = await this.applicationStorage.upload(name, dataToUpload);

    if (error instanceof FileLimitError) {
      throw new PayloadTooLargeException(error.message);
    }

    return error;
  }
}
