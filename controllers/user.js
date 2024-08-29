const {User} = require('../models/user');

async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;
    if(!name || !password || !email) return res.status(400).json({message: 'All fields are required'}); 
    const user = await User.create({
        name : name,
        email : email,
        password : password,
    })
    return res.render('home');
}

module.exports = {
    handleUserSignUp,
}