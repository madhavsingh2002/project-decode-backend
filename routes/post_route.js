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

app.delete("/deletepost/:postId", protectedRoute, async (req, res) => {
    try {
        const postFound = await PostModel.findOne({ _id: req.params.postId }).populate("author", "_id");
        
        if (!postFound) {
            return res.status(400).json({ error: "Post does not exist" });
        }

        // Check if the post author is the same as the logged-in user; only then allow deletion
        if (postFound.author._id.toString() === req.user._id.toString()) {
            await postFound.remove();
            res.status(200).json({ result: "Post deleted successfully" });
        } else {
            res.status(403).json({ error: "You are not authorized to delete this post" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the post." });
    }
});


