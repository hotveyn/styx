import { $Enums, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

(async function () {
  try {
    await prisma.parameter.create({
      data: {
        name: 'SaluteSpeech Api Credentials',
        description: 'Ключ для авторизации API SaluteSpeech',
        value: process.env.SPEECH_CREDENTIALS,
        code: $Enums.ParameterCode.SPEECH_CREDENTIALS,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.log('Parameter SPEECH_CREDENTIALS already exists');
    } else {
      throw e;
    }
  }
  try {
    await prisma.parameter.create({
      data: {
        name: 'Dadata Api Credentials',
        description: 'Ключ для авторизации API Dadata',
        value: process.env.DADATA_CREDENTIALS,
        code: $Enums.ParameterCode.DADATA_CREDENTIALS,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.log('Parameter DADATA_CREDENTIALS already exists');
    } else {
      throw e;
    }
  }
  try {
    await prisma.parameter.create({
      data: {
        name: 'Время жизни refresh токена',
        description: 'В днях',
        value: process.env.REFRESH_TOKEN_LIFE_TIME,
        code: $Enums.ParameterCode.REFRESH_TOKEN_LIFE_TIME,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.log('Parameter REFRESH_TOKEN_LIFE_TIME already exists');
    } else {
      throw e;
    }
  }
  try {
    await prisma.parameter.create({
      data: {
        name: 'Время жизни access токена',
        description: 'В минутах',
        value: process.env.ACCESS_TOKEN_LIFE_TIME,
        code: $Enums.ParameterCode.ACCESS_TOKEN_LIFE_TIME,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.log('Parameter ACCESS_TOKEN_LIFE_TIME already exists');
    } else {
      throw e;
    }
  }
  try {
    await prisma.parameter.create({
      data: {
        name: 'Токен телеграм бота',
        description: '',
        value: process.env.TELEGRAM_BOT_TOKEN,
        code: $Enums.ParameterCode.TELEGRAM_BOT_TOKEN,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.log('Parameter TELEGRAM_BOT_TOKEN already exists');
    } else {
      throw e;
    }
  }
  try {
    await prisma.parameter.create({
      data: {
        name: 'Имя телеграм бота',
        description: '',
        value: process.env.TELEGRAM_BOT_NAME,
        code: $Enums.ParameterCode.TELEGRAM_BOT_NAME,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.log('Parameter TELEGRAM_BOT_NAME already exists');
    } else {
      throw e;
    }
  }
  try {
    await prisma.parameter.create({
      data: {
        name: 'Интервал между отправкой запроса к устройствам клиентам STYX',
        description: 'В милисекундах',
        value: process.env.DEVICE_DETECT_INTERVAL,
        code: $Enums.ParameterCode.DEVICE_DETECT_INTERVAL,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.log('Parameter DEVICE_DETECT_INTERVAL already exists');
    } else {
      throw e;
    }
  }

  try {
    await prisma.user.create({
      data: {
        login: 'adminushka',
        password: await bcrypt.hash('password', 10),
        name: 'Admin Admin Admin',
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.log('Admin already exists');
    } else {
      throw e;
    }
  }
})();
