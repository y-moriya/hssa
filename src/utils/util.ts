import { Connection } from 'postgrejs';
import dotenv from 'dotenv';

// .env ファイルの内容を読み込む
dotenv.config();

export const createConnection = (): Connection => {
  return new Connection({
    host: 'localhost',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
};
