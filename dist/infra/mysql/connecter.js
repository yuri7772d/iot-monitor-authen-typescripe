import mysql from "mysql2/promise";
export class Mysql {
    pool;
    constructor(dbConfig) {
        this.pool = createPool(dbConfig);
    }
    async query(sql, params) {
        const [rows] = await this.pool.execute(sql, params);
        return rows;
    }
    async execute(sql, params) {
        const [result] = await this.pool.execute(sql, params);
        return result;
    }
}
function createPool(dbConfig) {
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
