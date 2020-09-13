const passport=require('passport');
const mongoose = require('mongoose');
require('../models/User');
const {genPassword}=require('../middleware/loginHelpers');
const requireLogin=require('../middleware/requireLogin');
const requireAdmin=require('../middleware/requireAdmin');

const User = mongoose.model('users');

module.exports=(app)=>{

// app.get('*',(req, res)=>{
//     res.send('you are logged in')
// })
app.get('/auth/google', passport.authenticate('google',{
    scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback',
 passport.authenticate('google'),
 (req, res)=>{
     res.redirect('/main/dash');
 } 
 );

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/main/dash',
        failureRedirect: '/login'
    })
);

app.post('/api/login', passport.authenticate('local'), async (req, res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/main/dash');
    } else {
        res.redirect('/login');
    }
});


app.post('/api/register', async (req, res)=>{
    const username= req.body.username;
    const password=req.body.password;
    const saltHash = genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const confirmPassword = req.body.confirmPassword;
    const existingUser= await User.findOne({ 'local.email': req.body.email });
    const existingUserName = await User.findOne({ 'local.username': username });
    const user = await new User({ local: {
        username: req.body.username,
        hash: hash,
        salt: salt,
        email: req.body.email
      }
      
    });

    if(existingUser){
        res.status(401).send('<h1>ERROR!<br/>401 Unauthorized<br/><br/>You have already signed up.  Please log in using the username and password you have selected.</h1>');
    }else if(existingUserName){
        res.status(401).send('<h1>ERROR!<br/>401 Unauthorized<br/><br/>This username is not available. Please select another username.</h1>')
    }else if(password !== confirmPassword){
        res.status(401).send('<h1>ERROR!<br/>401 Unauthorized<br/><br/>Your passwords do not match.</h1>')
    }else if(!existingUser && !existingUserName && password === confirmPassword){
        await user.save().then((user)=>{
        }).catch((err)=>{
            res.send(err);
            console.log(user);
        });

        res.redirect('/login');
    }
});

app.get('/api/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

app.get('/api/current_user', (req, res)=>{
    res.send(req.user);
});

app.get('/api/users', requireLogin, requireAdmin, async (req, res)=> {

    const users = await User.find();
    res.send(users);
});

app.get('/api/users/delete/:id', requireLogin, requireAdmin, async (req, res)=> {
    try{
       const user= await User.findByIdAndDelete({_id: req.params.id });
        console.log(req.params)
        res.redirect('/admin/users');
    }catch(err){
        res.send(err);
    }
});

};