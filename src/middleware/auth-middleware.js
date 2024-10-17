class AuthMiddleware {

  checkLoginFields(req, res, next) {
    const {
      username,
      password
    } = req.body;

    if( !username || !password || username.length === 0 || password.length === 0 )
      return res.status(400).json({ success: false, message: "El usuario o la contraseña no fueron agregados" });    

    next();
  }

  checkRegisterFields(req, res, next) {
    const {
      name,
      lastname,
      cellphone,
      email,
      password
    } = req.body;

    if( !name || !lastname || !cellphone || !email || !password )
      return res.status(400).json({ success: false, message: "Los campos no están completos" });

    next();
  }

  timestamp(req, res, next){
    const date = new Date();
    const start = date.toISOString().replace('T', ' ').substring(0, 19);
    req.start = start;

    next();
  }
}

export const authMiddleware = new AuthMiddleware();