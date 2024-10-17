import express from 'express'; 
import cors from 'cors';
import authRouter from './routes/auth-router.js';
import { authMiddleware } from './middleware/auth-middleware.js';

const app = express();

const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware.timestamp);
app.use('/auth', authRouter);

app.use('**', (req, res) => {
  res
    .status(400)
    .json({ success: false, message: "Ruta no registrada", timestamp: req.start })
})

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))