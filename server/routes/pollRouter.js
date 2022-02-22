const { Router } = require('express')

var pollRouter = Router();

pollRouter.route('/')
.all( (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get( (req, res) => {
    res.send('Get all polls')
})

module.exports = pollRouter;