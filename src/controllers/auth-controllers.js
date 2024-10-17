import { authServices } from "../services/auth-services.js"; 
import { codesErrors } from "../utils/codes-errors-mysql.js";


export const login = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;

    const { token } = await authServices.login({ username, password });
    
    res.status(200).json({ success: true, token, timestamp: req.start });
  } catch (error) {
    const {
      code,
      message
    } = error;
    
    res.status(500).json({ success: false, nameError: codesErrors[code], message, timestamp: req.start })
  }
}

export const register = async (req, res) => {
  try {
    const {
      name,
      lastname,
      cellphone,
      email,
      password
    } = req.body;
    
    await authServices.register({
      name,
      lastname,
      cellphone,
      email,
      password
    });

    res.status(201).json({ success: true, message: "Usuario registrado" });

  } catch (error) {
    const {
      code,
      message
    } = error;

    res.status(500).json({ success: false, nameError: codesErrors[code], message, timestamp: req.start })
  }
}