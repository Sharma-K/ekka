const mongoose = require('mongoose');
const passportlocalmongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


//talking about this.. I have made this for normal customer and was thinking as it is a single model so isAdmin will be helpful for differentating
// okay than we will user isAdmin rest fields are good
// and for products add two upload for gallery and thumbnail.


// okay
const UserSchema = new Schema({
    firstname: {
        type: String,
        
    },
    lastname: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    ec_select_city: {
        type: String,
       
    },
    postalcode: {
        type: Number,
        
    },
    ec_select_country: {
      type: String,
      
    },
    ec_select_state: {
        type: String,
       
    },
    password: {
        type: String,
        
    },
    isAdmin: {
        type: Boolean
    },
    username:{
        type: String
    }

})
UserSchema.plugin(passportlocalmongoose,{usernameField: 'email'});
module.exports = mongoose.model('User', UserSchema);