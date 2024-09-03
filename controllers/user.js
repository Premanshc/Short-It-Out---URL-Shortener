const mongoose = require('mongoose');
const User = require('../models/user');
const URL = require('../models/url');
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../services/auth');

async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;
    if(!name || !password || !email) return res.status(400).json({message: 'All fields are required'}); 
    const user = await User.create({
        name : name,
        email : email,
        password : password,
    })
    const allURLS = await URL.find({});
    return res.render('home',{
        urls: allURLS,
        user: user,
    });
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    if(!password || !email) return res.status(400).json({message: 'All fields are required'}); 
    const user = await User.findOne({
        email : email,
        password : password,
    })
    if(!user) return res.status(401).json({message: 'Invalid credentials'});

    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie('uid', sessionID);

    const allURLS = await URL.find({createdBy: user._id});
    return res.render('home',{
        urls: allURLS,
        user: user,
    });
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}