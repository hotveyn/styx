import { faker } from '@faker-js/faker/locale/ru';
import { App, createApp, defineEventHandler, toNodeListener } from 'h3';
import { createServer } from 'http';
import { DateTime } from 'luxon';

interface ILog {
  date: string;
  log: string;
}

interface StyxServerOptions {
  test: boolean;
  port: number;
  host: string;
}

export class StyxServer {
  app: App;
  achieves: string[] = [];
  infoes: ILog[] = [];
  errors: ILog[] = [];

  constructor(private readonly options: StyxServerOptions) {
    this.app = createApp({
      debug: options.test,
    });

    this.app.use('/metric', defineEventHandler(this.getMetrics.bind(this)));
  }

  sendInfo(log: string) {
    this.infoes.push({ date: DateTime.now().toISO(), log });
  }

  sendError(log: string) {
    this.errors.push({ date: DateTime.now().toISO(), log });
  }

  achieveGoal(goalCode: string) {
    this.achieves.push(goalCode);
  }

  async listen() {
    createServer(toNodeListener(this.app)).listen(
      this.options.port,
      this.options.host,
    );
  }

  getMetrics(): {
    infoes: ILog[];
    errors: ILog[];
    achieves: string[];
  } {
    if (this.options.test) {
      return {
        achieves: new Array(10).fill(0).map(() => faker.string.uuid()),
        infoes: new Array(10).fill(0).map(() => {
          return {
            date: DateTime.now().toISO(),
            log: JSON.stringify({
              id: faker.string.uuid(),
              level: 'info',
              message: faker.lorem.sentence(),
              timestamp: faker.date.past(),
            }),
          };
        }),
        errors: new Array(10).fill(0).map(() => {
          return {
            date: DateTime.now().toISO(),
            log: JSON.stringify({
              name: 'Error',
              message: faker.lorem.sentence(),
              stack: faker.lorem.paragraph(),
            }),
          };
        }),
      };
    }

    const achieves = [...this.achieves];
    const infoes = [...this.infoes];
    const errors = [...this.errors];
    this.achieves = [];
    this.infoes = [];
    this.errors = [];
    return {
      achieves,
      infoes,
      errors,
    };
  }
}
