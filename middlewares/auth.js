const {getUser} = require('../services/auth');

async function restrictToLoggedinUsersOnly(req, res, next){
    const userUid = req.cookies?.uid;
    if(!userUid) return res.redirect('/home/login');
    
    const user = await getUser(userUid);
    if(!user) return res.redirect('/home/login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;
    if(!userUid) return next();
    
    const user = await getUser(userUid);
    if(!user) return next();

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUsersOnly,
    checkAuth,
}