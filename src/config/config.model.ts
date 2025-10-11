export interface Server  {
  port: number;
}

export interface Database  {
  host:string,
  username:string,
  password:string,
  database:string,
}

export interface JWT  {
  secret: string;
  refreshSecret: string;
}

export interface ConfigEnv  {
  server: Server;
  mysql: Database;
  jwt: JWT;
}