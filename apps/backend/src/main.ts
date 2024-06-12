import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DeviceModule } from './device/device.module';
import { LogInfoModule } from './log-info/log-info.module';
import { LogErrorModule } from './log-error/log-error.module';
import { GoalModule } from './goal/goal.module';
import { GoalAchieveModule } from './goal-achieve/goal-achieve.module';
import { AuthModule } from './auth/auth.module';
import secureSession from '@fastify/secure-session';
import { ParameterModule } from './parameter/parameter.module';
import { FailureModule } from './failure/failure.module';
import multiPart from '@fastify/multipart';
import { ApplicationModule } from './application/application.module';
import { CameraModule } from './camera/camera.module';
import { SpeechModule } from './speech/speech.module';
import { AllExceptionsFilter } from './exception-filters/all-exception.filter';
import { Logger } from 'nestjs-pino';
import { FailureNotificationModule } from './failure-notification/failure-notification.module';
import { DadataModule } from './dadata/dadata.module';
import { NotificationModule } from './notification/notification.module';
import { StatModule } from './stat/stat.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        origin: '*',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      },
    },
  );

  app.setGlobalPrefix(process.env.SERVER_GLOBAL_PREFIX || '');

  await app.register(multiPart as any, {
    limits: {
      fieldNameSize: 100,
      fieldSize: 100,
      fields: 10,
      fileSize: 1000000000,
      files: 1,
      headerPairs: 2000,
      parts: 1000,
    },
  });

  await app.register(secureSession as any, {
    secret: 'secret-secret-secret-secret-secret',
    salt: 'salt-salt-salt-s',
    cookie: {
      httpOnly: true,
      sameSite: true,
      path: '/',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      whitelist: true,
      skipUndefinedProperties: true,
    }),
  );

  const logger = app.get(Logger);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(logger, httpAdapter));

  if (process.env.SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Styx API 🧙')
      .setVersion('0.0.0')
      .addTag('styx')
      .addBearerAuth()
      .addCookieAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      include: [
        AuthModule,
        UserModule,
        OrganizationModule,
        DeviceModule,
        LogInfoModule,
        LogErrorModule,
        GoalModule,
        GoalAchieveModule,
        ParameterModule,
        FailureModule,
        ApplicationModule,
        CameraModule,
        SpeechModule,
        FailureNotificationModule,
        NotificationModule,
        DadataModule,
        StatModule,
      ],
    });

    SwaggerModule.setup('api', app, document, {
      jsonDocumentUrl: 'json',
    });
  }

  await app.listen(+process.env.SERVER_PORT!, process.env.SERVER_HOST!);
}

bootstrap();
