import { Connection } from 'postgrejs';
import dotenv from 'dotenv';

// .env ファイルの内容を読み込む
dotenv.config();

export const createConnection = (): Connection => {
  // TODO: 環境変数から接続情報を取得する
  const connectionString = process.env.POSTGRES_URL
  console.log('connectionString:', connectionString)
  return new Connection({
    host: 'localhost', port: 5432, user: 'postgres',
    password: 'postgres', database: 'app'
  })
};
