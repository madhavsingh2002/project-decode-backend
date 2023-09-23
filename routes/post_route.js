// Create the api for getting all the post..
app.get('/allposts',async(req,res)=>{
    try{
        const dbPosts  = await PostModel.find()
        .populate('author','_id fullname profileImg')
        .populate('comments.commentedBy','_id fullname')
        res.status(200).json({posts:dbPosts})
    }
    catch(err){
        res.status(505).json({error:err.message})
    }
})