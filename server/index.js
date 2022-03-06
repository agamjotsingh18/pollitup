import express from "express";
import userRouter from "./routes/userRoute";
const app=express();

app.use(express.json());

app.use('/user', userRouter);


app.listen('5000', () => {
    console.log('Server is running on port 5000');
})