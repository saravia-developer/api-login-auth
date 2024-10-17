export const users = [];
import mysql from 'mysql2/promise';
import { env } from './env.js';

class MYSQL {
  db;

  constructor() {
    this.db = mysql.createConnection({
      user: env.database.username,
      password: env.database.password,
      host: env.database.host,
      port: env.database.port,
      database: env.database.database
    })

    this.testConnection();
  }

  async testConnection() {
    (await this.db)
      .query('SELECT 1 + 1 as RESULT')
      .then(res => console.log(`MYSQL database connected, Result ${res[0][0].RESULT}` ))
      .catch(err => console.log('Connection error'))
      .finally( () => console.log('Complete operation'))
  }
}

export const database = await new MYSQL().db