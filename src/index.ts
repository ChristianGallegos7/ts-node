import express from 'express';
import empresaAuth from './routes/auth/empresas/empresa.route'

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api/auth/empresa", empresaAuth)

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
