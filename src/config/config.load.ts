import * as dotenv from "dotenv";
import type { ConfigEnv, Database as MYSQL, JWT, Server } from "./config.model.js";

dotenv.config();

export const config: ConfigEnv = {
  server: getServerEnv(),
  mysql: getDatabaseEnv(),
  jwt: getJWTEnv(),
};

function getServerEnv(): Server {
  const portEnv = process.env.PORT;
  if (!portEnv) {
    throw new Error("PORT is invalid!");
  }
  const port = Number(portEnv);
  if (isNaN(port)) {
    throw new Error("PORT is conved fail!");
  }

  return { port };
}


function getDatabaseEnv(): MYSQL {
  const host = process.env.MYSQL_HOST;
  if (!host) {
    throw new Error("MYSQL_HOST is invalid!");
  }
    const username = process.env.MYSQL_USERNAME;
  if (!username) {
    throw new Error("MYSQL_USERNAME is invalid!");
  }
    const password = process.env.MYSQL_PASSWORD;
  if (!password) {
    throw new Error("MYSQL_PASSWORD is invalid!");
  }
    const database = process.env.MYSQL_DATABASE;
  if (!database) {
    throw new Error("MYSQL_DATABASE is invalid!");
  }

  return { host,username,password,database };
}


function getJWTEnv(): JWT {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is invalid!");
  }
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  if (!refreshSecret) {
    throw new Error("JWT_REFRESH_SECRET is invalid!");
  }

  return { secret, refreshSecret };
}
