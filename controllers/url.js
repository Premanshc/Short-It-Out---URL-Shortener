const shortid = require('shortid');
const URL = require('../models/url.js');

async function handleGenerateShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({message: 'URL is required'}); 
    const shortId = shortid.generate();
    
    const temp = await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        visitedHistory: [],
        createdBy: req.user._id,
    })

    const allURLS = await URL.find({createdBy: req.user._id});
    return res.render('home', {
        urls: allURLS,
        id: shortId,
    })
}

async function handleRedirectURL(req, res){
    const shortID = req.params.shortId;
    const url = await URL.findOneAndUpdate({shortID}, {$push: {visitedHistory: {timestamp: Date.now()}}});
    if(!url) return res.status(404).json({message: 'URL not found'});
    return res.redirect(url.redirectURL);
}

async function handleGetAnalytics(req, res){
    const shortID = req.params.shortId;
    const reqURL = await URL.findOne({shortID});
    if(reqURL){
        return res.json({
            clicks: reqURL.visitedHistory.length,
            analytics: reqURL.visitedHistory
        }); 
    }
}

module.exports = {
    handleGenerateShortURL,
    handleRedirectURL,
    handleGetAnalytics
};
