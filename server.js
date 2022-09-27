import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import restaurantRouter from './routes/restaurantRouter';
import userRouter from './routes/userRouter';
import tutorialRouter from './routes/tutorialRouter';

config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/restaurants', restaurantRouter);
app.use('/api/users', userRouter);
app.use('/api/tutorials', tutorialRouter);



app.listen(5000, () => {
    console.log('Listening on port ' + process.env.PORT);
})