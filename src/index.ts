import express from 'express';
import empresaAuth from './routes/auth/empresas/empresa.route'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/", (req,res)=> {
  res.send("Hola Mundo")
})
app.use("/api/auth/empresa", empresaAuth)

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
