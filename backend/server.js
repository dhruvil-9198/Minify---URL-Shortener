import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import route from './routes/home.js';
import linkRoute from './routes/links.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: `${process.env.origin}`,
  credentials: true
}));

app.use('/', route);
app.use('/links', linkRoute);

mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => console.log("MongoDB started"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
