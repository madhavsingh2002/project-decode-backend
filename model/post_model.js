// Create the Model for Post related to user_model, having the field such as
// description,location,likes,comments,images,author.
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    likes:[
        {
            type:ObjectId,
            ref:'UserModel'
        }
    ],
    comments:[
        {
            commentText:String,
            commentedBy:{type:ObjectId,ref:'UserModel'}
        }
    ],
    images:{
        type:String,
        required: true,
    },
    author:{
        type:ObjectId,
        ref:'UserModel'
    }

})
mongoose.model('PostModel',postSchema)