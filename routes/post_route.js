// Create an API endpoint to retrieve all posts.
// Now, let's also create an API to fetch posts by specific users, utilizing the PostModel.

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
})

// Create an API endpoint for "myAllPosts" that retrieves posts belonging to the current user.
// For example, when a user accesses their profile, they can view all their own posts.

app.get('/myallposts',protectedRoute, async(req,res)=>{
    try{
        const dbPosts = await PostModel.find({author:req.user._id})
        .populate('author','_id fullname profileImg');
        res.status(200).json({posts:dbPosts})
    }
    catch(err){
        res.status(505).json({error:err.message})
    }// this is simple api endpoint for getting all user post...
})


// Define API endpoints for creating posts.

// Create this endpoints.....
app.post('/createpost',protectedRoute,async(req,res)=>{
    const {description,location,image}=req.body;
    try{
        if(!description || !location || !image){
            return res.status(404).json({error:'One or more mandatory fields are empty'})
        }
        req.user.password =undefined;
        const postObj = new PostModel({description,location,image,author:req.user});
        const newPost = await postObj.save()
        res.status(201).json({post:newPost})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

// Define API endpoints for deleting posts.


app.delete('/deletepost/:postId',protectedRoute,async(req,res)=>{
    try{
        const postFound = await PostModel.findOne({_id:req.params.postId}).populate("author","_id")
        if(!postFound){
          return  res.status(400).json({error:'Post does not Effect'})
        }
        // Check if the post author is the same as the logged-in user:only then allow.
        if(postFound.author._id.toString()===req.user._id.toString()){//matching that owner of post and person who is deleting is same or not...
            await postFound.remove()
            req.status(200).json({result:'post deleted successfully'})
        }
        else{
            res.status(400).json({error:'You are not authorized to delete this post'})
        }
    }
    catch(err){
        res.status(505).json({error:err.message})
    }
})

// Define API endpoints for Liking posts.


app.put('/like',protectedRoute,async(req,res)=>{
    try{
        const updatedPost= await PostModel.findByIdAndUpdate(
            req.body.postId,
            {$push:{likes:req.user._id }},
            {new:true}
        ).populate('author','_id fullname')
        if(!updatedPost){
            return res.status(404).json({error:'post not found'})
        }
    }
    catch(err){
        res.status(505).json({error:err.message})
    }
})


// Define API endpoints for unliking posts.


app.put('/unlike',protectedRoute,async(req,res)=>{
    try{
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.body.postId,
            {$pull:{unlikes:req.user._id}},
            {new:true}
        ).populate('author','_id fullname');
        if(!updatedPost){
            return res.status(404).json({error:'Post not found'})
        }
    }
    catch(err){
        res.status(500).json({error:'an Error Occur'})
    }
})

// Define API endpoints for Commenting posts.

app.put("/comment", protectedRoute, async (req, res) => {
    try {
        const comment = { commentText: req.body.commentText, commentedBy: req.user._id };
        
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.body.postId,
            { $push: { comments: comment } },
            { new: true }
        )
        .populate("comments.commentedBy", "_id fullName")
        .populate("author", "_id fullName");

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding a comment to the post." });
    }
});
