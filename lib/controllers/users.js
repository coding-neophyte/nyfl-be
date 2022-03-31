const { Router } = require('express');
const User = require('../models/User');


module.exports = Router().post('/', async (req, res, next) => {
    try{
        const newUser = await User.Signup({
            name: req.body.name,
            email: req.body.email,
        })

        res.send(newUser);
    }catch(error){
        next(error);
    }
});
