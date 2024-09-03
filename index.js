const express = require('express');
const path = require('path');
const {connectNow} = require('./connect');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUsersOnly, checkAuth} = require('./middlewares/auth')


//routes
const urlRoute = require('./routes/url');
const { handleRedirectURL } = require('./controllers/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const homeRoute = require('./routes/homeRouter');

const app = express();
const PORT = 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//connect to database
connectNow('mongodb://localhost:27017/url-shortener')
.then(()=>console.log('Connected to database'))
.catch((err)=>console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//api routes
app.use('/url', restrictToLoggedinUsersOnly, urlRoute);
app.get('/:shortId', handleRedirectURL);
app.use('/', checkAuth,staticRoute); 
app.use('/user', userRoute);
app.use('/home', checkAuth,homeRoute)

//server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

