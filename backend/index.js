import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDb from './database/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

//using middlewares
app.use(express.json());
app.use(cookieParser());

//importing routes
import userRoutes from './routes/userRoutes.js';

//using  routes
app.use('/api/user', userRoutes);


app.listen(port, (err) => {
    if (err) {
        console.log('ERROR : ',err)
    } else {
        console.log(`server stared at http://localhost:${port}`);
        connectDb();
    }
})