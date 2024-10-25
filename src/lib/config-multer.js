import multer from 'multer';
import path from 'path';
import { globalVariablesForESModules } from './global-variables-for-ES-modules.js';

const { __dirname } = globalVariablesForESModules();

/**
 * Es aquí donde se esta configurando multer para 
 * apuntar el guardado de archivos
 * ( destination ) y el nombrado que
 * se le dará ( filename )
 */
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'documents'),
  filename: function (req, file, callback) {
    const {
      originalname
    } = file;
    callback(null, originalname);
  }
});

const fileFilter = (req, file, callback) => {

  const allowedFiles = ['.xls', '.xlsx', '.csv', '.json'];
  const extname = path.extname(file.originalname).trim();

  if(!allowedFiles.includes(extname)) {
    callback(null, false);
    callback(new Error('El archivo que envías no está permitido'));
  }

  callback(null, true);
}

export const upload = multer({ storage: storage, fileFilter: fileFilter })