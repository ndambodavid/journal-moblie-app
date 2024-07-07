import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.router';
import journalRouter from './routes/journal.route';

require('dotenv').config();

// server
const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

app.use(morgan('dev'));
app.use(helmet());
app.disable('etag');

// cors => cross origin resource sharing
app.use(cors({
  origin: ['http://localhost:8081'],
  credentials: true,
}));

app.use('/api/v1', api);

app.use('/api/user', userRouter);

app.use('/api/journal', journalRouter);

app.get('/checkmate', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: '✨👋🌎Fantastic! ✨ Your Journal API is ready 🌈🦄',
  });
});


// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
})

app.use(ErrorMiddleware);

export default app;
