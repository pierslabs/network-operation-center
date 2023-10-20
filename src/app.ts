import { envs } from './plugins/envs.plugins';
import { Server } from './presenters/server';

(() => {
  main();
})();

function main() {
  console.log(envs);
  Server.start();
}
