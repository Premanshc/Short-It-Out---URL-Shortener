const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.get('/', async (req, res)=>{
    if(!req.user) return res.redirect('/home/login');
    const allURLS = await URL.find({ createdBy: req.user._id });
    return res.render('home', {
        urls: allURLS,
    });
})



module.exports = router;