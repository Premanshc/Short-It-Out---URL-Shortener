const mongoose = require('mongoose');

async function connectNow(dbURL) {
    return mongoose.connect(dbURL);
    
}

module.exports = { connectNow };