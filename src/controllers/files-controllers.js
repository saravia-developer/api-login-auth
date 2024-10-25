import { fileServices } from "../services/files-services.js";
import path from 'path';

class FilesControllers {

  async readFile(req, res) {

    try {
      const { file } = req
      const extname = path.extname(file.originalname).replaceAll('.', '').trim();

      const { formatData } = await fileServices.readFile(file, extname);

      res.status(200).json({ success: true, message: "Archivo subido con éxito", formatData })

    } catch (error) {
      console.error(error)
    }
  }
}

export const filesControllers = new FilesControllers();