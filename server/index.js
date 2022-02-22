const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRouter');
const pollRouter = require('./routes/pollRouter');

const app=express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/poll', pollRouter);

app.listen('5000', () => {
    console.log('Server is running on port 5000');
})