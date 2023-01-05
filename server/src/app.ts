import express from 'express';
import userRouter from './routes/users.router';
import loginRouter from './routes/login.router';
import ordersRouter from './routes/orders.router';
import cartRouter from './routes/cart.router';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/login', loginRouter);

app.use('/users', userRouter);

app.use('/cart', cartRouter)

app.use('/orders', ordersRouter);


export default app; 