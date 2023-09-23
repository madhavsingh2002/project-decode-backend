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
})
// Create an API endpoint for "myAllPosts" that retrieves posts belonging to the current user.
// For example, when a user accesses their profile, they can view all their own posts.

app.get("/myallposts", protectedRoute, async (req, res) => {
    try {
        const dbPosts = await PostModel.find({ author: req.user._id })
            .populate("author", "_id fullName profileImg");
        res.status(200).json({ posts: dbPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching user's posts." });
    }
});
