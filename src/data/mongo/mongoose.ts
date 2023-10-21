import mongoose from 'mongoose';

export interface MongoDataBaseOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {
  static async connect(options: MongoDataBaseOptions) {
    try {
      mongoose.connect(options.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: options.dbName,
      } as any);

      console.log(
        `MongoDataBase.connect to database ${mongoose.connection.name}`
      );
    } catch (error) {
      console.error('Error not connect mongo😱', error);
    }
  }
}
