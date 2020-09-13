const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    google:{
        googleId: String,
        firstName: String,
        lastName: String,
        emails: String,
    },
    facebook: {
        id: String,
        firstName: String,
        lastName: String,
        
    },
    local: {
        email: {
            type: String,
           
        },
        username: {
            type: String,
        },
        hash: String,
        salt: String,
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
});
  
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.local.hash;
    delete userObject.local.salt;

    return userObject;
};

mongoose.model('users', userSchema);
