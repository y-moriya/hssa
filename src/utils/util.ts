import { Connection } from 'postgrejs';
import dotenv from 'dotenv';

// .env ファイルの内容を読み込む
dotenv.config();

export const createConnection = (): Connection => {
  const connectionString = process.env.POSTGRES_CONN_STRING
  return new Connection(connectionString)
};
