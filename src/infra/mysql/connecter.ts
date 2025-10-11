import { Database } from "../../config/config.model.js";
import mysql from "mysql2/promise";

export class Mysql {
  private pool: mysql.Pool;

  constructor(dbConfig: Database) {
    this.pool = createPool(dbConfig);
  }

  async query<T =any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await this.pool.execute<Row<T>[]>(sql, params);
    return rows;
  }
    async execute(sql: string, params?: any[]): Promise<mysql.OkPacket> {
    const [result] = await this.pool.execute<mysql.OkPacket>(sql, params);
    return result;
  }

}

function createPool(dbConfig: Database): mysql.Pool {
  return mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}
export type Row<T> = T & mysql.RowDataPacket;
