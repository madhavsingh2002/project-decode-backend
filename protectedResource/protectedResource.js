// Create middleware to authenticate post-content only for authenticated users when posting.
// Let's create this middleware...
async function authenticateUser(req,res,next){
    const {authorization} =req.headers;// this will get from the header.
    if(!authorization){
        return res.status(401).json({error:'User not logged in'})
    }
    try{
        const token = authorization.replace('Bearer','');
        // The token is mainly composed of header, payload, signature.
// header:{"alg" : "HS256","typ" : "JWT"} Payload: { "id" : 123456789, "name" : "Joseph" } Secret: sdfsdfsfsdf
        
        const payload= jwt.verify(token,JWT_SECRET);
        const {_id}= payload;
        const dbUser = await UserModel.findById(_id);
        if(!dbUser){
            return res.status(401).json({error:'User not found'});

        }
        req.user = dbUser;// if user found 
        next()// this will transfer the call to the next function which generally controllers....
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}
// Thank's for watching ....