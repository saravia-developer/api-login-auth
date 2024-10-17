import dotenv, { config } from 'dotenv';

config();

export const env = {
  database: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  }
}