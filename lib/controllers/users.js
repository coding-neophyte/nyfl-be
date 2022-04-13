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
})
.get('/list', async (req, res, next) => {
    try {
        const emailList = await User.getEmailList();

        res.send(emailList);
    } catch(error){
        next(error);
    }
})
.delete('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const deletedUser = await User.deleteUser(id);

        res.send(deletedUser);
    }catch(error){
        next(error);
    }
});
