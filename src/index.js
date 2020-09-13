const express = require('express');
const mongoose = require('mongoose');
const passport=require('passport');
const keys =require('./config/keys');
const bodyParser=require('body-parser');
const paypal = require('paypal-rest-sdk');
const cookieSession=require('cookie-session');
require('./models/User');
require('./models/Products');
require('./models/Cart');
require('./models/orders');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongo_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

paypal.configure({
    'mode': 'sandbox', // live for production
    'client_id': keys.paypalClientID,
    'client_secret': keys.paypalSecret
});

const path=require('path');
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

require('./routes/authRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/cartRoutes')(app);
require('./routes/checkoutRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT||8080;

app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT);
});