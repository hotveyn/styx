import { StyxServer } from '../src/styx.server';

const server = new StyxServer({
  test: true,
  host: 'localhost',
  port: 3000,
});

(async function () {
  await server.listen();
})();
