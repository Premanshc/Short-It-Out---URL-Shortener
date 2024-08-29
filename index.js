const express = require('express');
const path = require('path');
const {connectNow} = require('./connect');

//routes
const urlRoute = require('./routes/url');
const { handleRedirectURL } = require('./controllers/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//connect to database
connectNow('mongodb://localhost:27017/url-shortener')
.then(()=>console.log('Connected to database'))
.catch((err)=>console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//api routes
app.use('/url', urlRoute);
app.get('/:shortId', handleRedirectURL);
app.use('/', staticRoute); //all front end pages
app.use('/user', userRoute);

//server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})