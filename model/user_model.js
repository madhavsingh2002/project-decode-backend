// Create the Model for user having fullname, email, password, and profileImg.
// Note:profileImg should have default image.
const mongoose = require('mongoose')
const userSchema =  new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImg:{
        type:String,
        default:'url'
    }  
})
mongoose.model('UserModel',userSchema)