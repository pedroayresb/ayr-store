import express from 'express';
import userRouter from './routes/users.router';
import loginRouter from './routes/login.router';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use('/users', userRouter);


export default app; 