import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import { resolve } from 'path';
import { pipeline } from 'node:stream/promises';
import { MultipartFile } from '@fastify/multipart';

@Injectable()
export class SpeechStorage implements OnModuleInit {
  pathToFolder: string = resolve('uploads', 'speech');

  async onModuleInit() {
    if (!fs.existsSync(this.pathToFolder)) {
      fs.mkdirSync(this.pathToFolder, { recursive: true });
    }
  }

  async upload(file: MultipartFile, fileName: string) {
    await pipeline(
      file.file,
      fs.createWriteStream(resolve(this.pathToFolder, fileName + '.wav')),
    );
  }

  async delete(fileName: string) {
    fsPromises.rm(resolve(this.pathToFolder, fileName), {
      recursive: true,
      force: true,
    });
  }

  async readFile(fileName: string) {
    return fsPromises.readFile(resolve(this.pathToFolder, fileName));
  }
}
