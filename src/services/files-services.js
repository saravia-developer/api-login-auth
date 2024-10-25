import { database } from '../utils/database.js';
import XlsxPopulate, {  } from 'xlsx-populate';
import fs from 'node:fs';

const table = 'fileData';

class FileServices {

  constructor() {}

  async readFile(file, extname) {

    switch (extname) {
      case 'json':
        return this.handleJson(file);
        break;
      case 'xlsx':
        return this.handleExcel(file);
        break;
      case 'xls':
        return this.handleExcel(file);
        break;
      case 'csv':
        return this.handleCSV(file);
        break;
      default:
        console.log('Método no disponible')
    }
  }

  async handleJson(file) {
    try {

      const {
        filename,
        mimetype,
        path
      } = file;

      const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
      const propertiesData = Object.keys(data[0]);
      const formatData = data.map(element => Object.values(element));
      formatData.unshift(propertiesData);

      const query = `INSERT INTO ${table} (name, type, data) VALUES (?, ?, ?)`;
      const values = [filename, mimetype, formatData];
      await database.execute(query, values);

      fs.unlinkSync(path, (err) => {
        if(err) console.log('Error al eliminar el archivo del servidor: ', err);
        console.log('Archivo eliminado exitosamente')
      })

      return { formatData };

    } catch (error) {

      throw error
    }
  }

  async handleExcel(file) {

    const {
      filename,
      mimetype,
      path
    } = file;

    const workbook = await XlsxPopulate.fromFileAsync(path);
    const dataWorkbook = workbook.sheet(0).usedRange().value();
    const formatData = dataWorkbook;

    const query = `INSERT INTO ${table} (name, type, data) VALUES (?, ?, ?)`;
    const values = [filename, mimetype, dataWorkbook];
    const result = await database.execute(query, values);

    fs.unlinkSync(path, (err) => {
      if(err) console.log('Error al eliminar el archivo del servidor: ', err);
      console.log('Archivo eliminado exitosamente')
    })

    return { formatData } 
  }

  async handleCSV(file) {

    const {
      filename,
      mimetype,
      path
    } = file;

    const data = fs.readFileSync(path, 'utf-8');

    const formatData = data.split('\n').map(element => element.replace('\r', '').split(';'));
    formatData.pop();

    const query = `INSERT INTO ${table} (name, type, data) VALUES (?, ?, ?)`
    const values = [filename, mimetype, formatData];
    const result = database.execute(query, values);

    fs.unlinkSync(path, (err) => {
      if(err) console.log('Error al eliminar el archivo del servidor: ', err);
      console.log('Archivo eliminado exitosamente')
    })

    return { formatData }
  }
}

export const fileServices = new FileServices()