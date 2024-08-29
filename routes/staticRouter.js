const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.get('/', async (req, res)=>{
    const allURLS = await URL.find({});
    res.render('home', {
        urls: allURLS,
    });
})

router.get('/signup', (req, res)=>{
    res.render('signup'); 
});

module.exports = router;