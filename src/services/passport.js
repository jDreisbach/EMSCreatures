const passport=require('passport');
const keys = require('../config/keys');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
require('../models/User')
const {validPassword} =require('../middleware/loginHelpers');


const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    let userId = mongoose.Types.ObjectId(id);
    User.findById(userId).then((user)=>{
        done(null, user);
    });
});

passport.use(

    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) =>{
        const userData = {
            googleId: profile.id,   
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails.value
        }
        const existingUser = await User.findOne({ 'google.googleId': profile.id });
       
            if(!existingUser){

            const user = await new User({ google: userData }).save();

            done(null, user);
            }else{
              
            done(null, existingUser);
            }
            
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: '/auth/facebook/callback',
            profileFields: ["email", "name"]
        },
        
        async (accessToken, refreshToken, profile, done) => {
            const { id, first_name, last_name, email } = profile._json;
            const userData = {
                id,
                firstName: first_name,
                lastName: last_name,
                email
            };
            const existingUser = await User.findOne({ 'facebook.id': id });

            if(!existingUser){
                const user = await new User({facebook: userData}).save();
                done(null, user);
            }else{
            done(null, existingUser);
            }
        })
    );

    
passport.use(new LocalStrategy(
     async (username, password, done) => {
         console.log(username, password)
        await User.findOne({ "local.username": username  }, (err, user)=>{
            try{
                if(!user){
                    done(null, false);
                }
                console.log(user)
            const isValid = validPassword(password, user.local.hash, user.local.salt);
            console.log(isValid)
            
                if(isValid) {
                     done(null, user);
                     console.log(user)
                }
            } catch(err){
                done(null, err);
                console.log(err)
            }
        });
    }));
