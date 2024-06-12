import { faker } from '@faker-js/faker/locale/ru';
import { StyxBrowser } from '../src/styx.browser';

const styxBrowser = new StyxBrowser({
  deviceCode: 'WjO6VqjSrskYBr7qRWMd',
  test: false,
  url: 'http://localhost:7123/api',
});

(async function () {
  await styxBrowser.achieveGoal('3cac9ffc-6ab1-48a6-a5e6-1da10f102776');
  await styxBrowser.achieveGoal('3cac9ffc-6ab1-48a6-a5e6-1da10f102776');
  await styxBrowser.achieveGoal('3cac9ffc-6ab1-48a6-a5e6-1da10f102776');
  await styxBrowser.sendInfo({
    id: faker.string.uuid(),
    level: 'info',
    message: faker.lorem.sentence(),
    timestamp: faker.date.past(),
  });
  await styxBrowser.sendInfo({
    id: faker.string.uuid(),
    level: 'info',
    message: faker.lorem.sentence(),
    timestamp: faker.date.past(),
  });
  await styxBrowser.sendInfo({
    id: faker.string.uuid(),
    level: 'info',
    message: faker.lorem.sentence(),
    timestamp: faker.date.past(),
  });
  await styxBrowser.sendError({
    name: 'Error',
    message: faker.lorem.sentence(),
    stack: faker.lorem.paragraph(),
  });
  await styxBrowser.sendError({
    name: 'Error',
    message: faker.lorem.sentence(),
    stack: faker.lorem.paragraph(),
  });
  await styxBrowser.sendError({
    name: 'Error',
    message: faker.lorem.sentence(),
    stack: faker.lorem.paragraph(),
  });
  await styxBrowser.sendError({
    name: 'Error',
    message: faker.lorem.sentence(),
    stack: faker.lorem.paragraph(),
  });
  await styxBrowser.achieveGoal('3cac9ffc-6ab1-48a6-a5e6-1da10f102776');
})();
