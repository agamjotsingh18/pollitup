const { Router } = require('express')

var userRouter = Router();

userRouter.route('/')
.all( (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get( (req, res) => {
    res.send('Get all users')
});

module.exports = userRouter;