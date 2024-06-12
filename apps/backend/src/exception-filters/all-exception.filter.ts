import { ArgumentsHost, Catch, HttpServer } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ApiError } from '../errors/api-error';
import { Logger } from 'nestjs-pino';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private readonly logger: Logger,
    applicationRef?: HttpServer,
  ) {
    super(applicationRef);
  }
  catch(exception: unknown, host: ArgumentsHost) {
    if (!(exception instanceof ApiError)) {
      this.logger.error(exception);
    }

    super.catch(exception, host);
  }
}
