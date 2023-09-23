// Create the api for getting all the post..
// Let's create the api for getting the posts by userss.
// Here we will refer to the PostModel....
app.get('/allposts',async(req,res)=>{
    try{
        const dbPost = await PostModel.find()
        .populate('author','_id fullname profileImg')// Populate is used to refer another collection
        .populate('comments.commentedBy','_id fullname')
        res.status(202).json({posts:dbPost})
    }
    catch(err){
        res.status(505).json({error:err.message})
    }
})// This is the simple api for getting all the posts by users...
// REFER the usermodel and postmodel... here
// Thanks for watching......
