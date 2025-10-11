import mysql from "mysql2/promise";
import { UserEntity } from "../../../domain/entities/user.js";
import { Mysql } from "../connecter.js";
import { UserRepo } from "../../../domain/repo/user.repo.js";

export class UserMysql implements UserRepo {
  private db: Mysql;
  constructor(db: Mysql) {
    this.db = db;
  }
  async get_by_username(username: string): Promise<UserEntity> {
    const users = await this.db.query<UserEntity>(
      "SELECT id, username, password FROM users WHERE username = ?",
      [username]
    );
    if (users.length == 0) {
      throw new Error("username not found!");
    }
    return users[0];
  }
  async create(username: string, password: string): Promise<{ id: number }> {
    const result = await this.db.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
    return { id: result.insertId };
  }
}
