import express from 'express';
import empresaAuth from './routes/auth/empresas/empresa.route'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express();

dotenv.config()
//Habilitar cors
app.use(cors())
//Leer datos de formularios
app.use(express.json());


const port = process.env.PORT || 3000;

app.use("/api/auth/empresa", empresaAuth)

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
