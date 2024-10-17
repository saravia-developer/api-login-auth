import { database } from '../utils/database.js';
import jwt from 'jsonwebtoken';


const table = 'users';
const prefix = "u";


class AuthServices {

  async register({ name, lastname, cellphone, email, password }) {
    
    try {
      
      const query = `INSERT INTO ${table} (name, lastname, cellphone, email, password) VALUES (?, ?, ?, ?, ?);`;
      const values = [ name, lastname, cellphone, email, password ];

      const result = await database.execute(query, values);

      return { result }

    } catch (error) {
      throw error;
    }
  }

  async login({ username, password }) {
    try {
      
      const query = `SELECT ${prefix}.email, ${prefix}.password FROM ${table} ${prefix} WHERE ${prefix}.email='${username}';`;
      const userExists = await database.query(query);
      
      if(!userExists[0].length) 
        throw new Error("Usuario no registrado");

      if(userExists[0][0].password !== password)
        throw new Error("Contraseña Incorrecta");

      delete userExists[0][0].password

      const token = jwt.sign(userExists[0][0], 'secret', { expiresIn: 60 * 60 });

      return { token };

    } catch (error) {
      throw error
    }
  }
}

export const authServices = new AuthServices();