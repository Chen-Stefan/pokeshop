import * as dotenv from "dotenv";
import mongoose, { Error } from 'mongoose';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import paymentRoute from './routes/payment'
import errorHandler from './middleware/error'
import path from 'path'
// .env
dotenv.config();

mongoose.connect(`${process.env.MONGO_URI}`, {
}, (err: Error) => {
   if (err) throw err
})

// Middleware
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}))

// Routes
app.use('/api/user', userRouter);
app.use('/api/payment', paymentRoute)

// Error Handler (Should be last piece of middleware)
app.use(errorHandler)

// Production Deploy
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1))
})
 
