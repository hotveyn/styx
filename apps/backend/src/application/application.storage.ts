import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';
import { resolve } from 'path';
import { pipeline } from 'node:stream/promises';
import { MultipartFile } from '@fastify/multipart';
import * as tar from 'tar';
import { FileLimitError } from './errors/file-limit';

@Injectable()
export class ApplicationStorage implements OnModuleInit {
  pathToFolder: string = resolve('uploads', 'applications');

  async onModuleInit() {
    if (!fs.existsSync(this.pathToFolder)) {
      fs.mkdirSync(this.pathToFolder, { recursive: true });
    }
  }

  async create(name: string) {
    await fsPromises.mkdir(resolve(this.pathToFolder, name));
  }

  async upload(name: string, dataToUpload: MultipartFile) {
    await this.clear(name);

    const pathToDirectory = resolve(this.pathToFolder, name);

    let error;

    await pipeline(
      dataToUpload.file,
      tar.extract({ cwd: pathToDirectory }).on('error', async (e) => {
        if (dataToUpload.file.truncated) {
          error = new FileLimitError('File is oversized');
          return;
        }

        error = e;
        console.error(e);
      }),
    );

    if (error) {
      await this.clear(name);
    }

    return error;
  }

  async update(oldName: string, newName: string) {
    await fsPromises.rename(
      resolve(this.pathToFolder, oldName),
      resolve(this.pathToFolder, newName),
    );
  }

  async clear(name: string) {
    try {
      const files = await fsPromises.readdir(resolve(this.pathToFolder, name));

      if (files.length) {
        const deleteFilePromises = files.map((file) =>
          fsPromises.rm(resolve(this.pathToFolder, name, file), {
            recursive: true,
            force: true,
          }),
        );

        await Promise.all(deleteFilePromises);
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(name: string) {
    try {
      fsPromises.rm(resolve(this.pathToFolder, name), {
        recursive: true,
        force: true,
      });
    } catch (err) {
      throw err;
    }
  }
}
