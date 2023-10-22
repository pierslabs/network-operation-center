import { MongoDataBase } from './data/mongo/mongoose';
import { envs } from './plugins/envs.plugins';
import { Server } from './presenters/server';

(() => {
  main();
})();

async function main() {
  console.log(envs);
  MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
}
