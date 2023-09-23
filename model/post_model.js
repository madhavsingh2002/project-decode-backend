// Create the Model for Post related to user_model, having the field such as
// description,location,likes,comments,images,author.
// Let's create the Model for Post...
const mongoose = require('mongoose')// install and import the mongoose..
const { ObjectId } = mongoose.Schema.Types;//Import this too.
const PostSchema = new mongoose.Schema({
    decription: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    likes:
        [
            {
                type: ObjectId,
                ref: 'UserModel',// refer the userModel to see which user like the post....
            }
        ],// [] used to add multiple likes from other uses..
    Comments:[
        {
            commentText:String,
            commentedBy:{type:ObjectId,ref:'UserModel'}
        }
    ],// [] used to add multiple comments..
    images:{
        type:String,
        required:true,
    },
    author:{
        type:ObjectId,
        ref:'UserModel'// this belongs to only one user..
    }

})
mongoose.model('PostModel',PostSchema)// PostModel is the name of model..
// Thank's for watching.....