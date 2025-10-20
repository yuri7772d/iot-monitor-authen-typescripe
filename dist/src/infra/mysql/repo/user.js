export class UserMysql {
    db;
    constructor(db) {
        this.db = db;
    }
    async get_by_username(username) {
        const users = await this.db.query("SELECT id, username, password FROM users WHERE username = ?", [username]);
        if (users.length == 0) {
            throw new Error("username not found!");
        }
        return users[0];
    }
    async create(username, password) {
        const result = await this.db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
        return { id: result.insertId };
    }
}
