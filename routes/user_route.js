// Create the api for SIGNUP of user
// having the fields such as fullname, email, password, profileImg.


router.post('/signup', async (req,res)=>{
    const {fullname,email,password,profileImg} =req.body;
    try{
        if(!fullname || !password || !email){
            return res.status(400).json({error:'One or more '})
        }
        const userInDB = await UserModel.findOne({email:email})
        if(userInDB){
            return res.status(500).json({error:'User with this email already existed'})
        }
        const hashedPassword = await bcryptjs.hash(password,16)
        const user =  new UserModel({fullname,email,password:hashedPassword,profileImg})
        const newUser = await user.save()
        res.status(201).json({result:'User Signed up successfully '})
    }
    catch(err){
        res.status(505).json({error:err.message})
    }
   
})


// Create the api for LOGIN of user
// having the fields such as  email, password.


router.post('/login',async(req,res)=>{
    const {email,password} =req.body;
    try{
        if(!password || !email){
            return res.status(404).json({error:'One or more mandotary fields'})
        }// Checking the field available or not.
        const userInDB = await UserModel.findOne({email:email})
        if(!userInDB){
            return res.status(401).json({error:'Invalid Credentials'})
        }
        const didMatch = await bcryptjs.compare(password,userInDB.password)
        // Comparing the passwords with db passwords password->coming from the input, userInDB.password->from Database.

        if(didMatch){
            const jwtToken = jwt.sign({_id:userInDB._id},JWT_SECERT)
            const userInfo ={'_id':userInDB._id,'email':userInDB.email}
            res.status(200).json({result:{token:jwtToken,user:userInfo}})
        }
        else{
            return res.status(401).json({error:'Invalid Credentials'})
        }
    }
    catch(err){
        res.status(505).json({error:'An Error occured during login'})
    }
})