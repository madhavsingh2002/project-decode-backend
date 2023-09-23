// Create the Model for user having fullname, email, password, and profileImg.
// Note:profileImg should have default image.

// Let's see how we can create the model for it..
const mongoose =  require('mongoose')// mongoose need to import and install.
const userSchema = new mongoose.Schema({
    fullname:{
      type:String,
      required:true
    },
    email:{
        type:String, // This is the user-model for refer..
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImg:{
        type:String,
        default:"url"// For By Default we can inside the picture..
    }
})
// let's import this....
mongoose.model('UserModel',userSchema)// UserModel will the name of the Model...
// This is the simple example to create the model for user...
// thank's for watching.......
