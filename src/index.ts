import express from 'express'
import { router } from './routes/route'
import dotenv from 'dotenv'
import { errorHandler } from './errorHandler';

const app = express();
dotenv.config();
app.use(express.json())
app.use('/', router);
app.use(errorHandler)
const port = process.env.PORT;

app.listen(port, () => console.log(`Server at ${port}`))