import mongoose from 'mongoose';
import { logModel } from './data/mongo/models/log.model';
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
  // const newLog = await logModel.create({
  //   level: 'low',
  //   message: 'message',
  //   origin: 'origin',
  // });
  // await newLog.save();
  const a = await logModel.find();
  console.log(a);
  Server.start();
}
