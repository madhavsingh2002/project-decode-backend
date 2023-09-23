// Create the api for SIGNUP of user
// having the fields such as fullname, email, password, profileImg.

// Let's the api which we can signup the user.
// This api will have fields like fullname, email, password, profileImg.
router.post('/signup', async(req,res)=>{
    // This will be our user Input...
    const {fullname,email, password,profileImg}=req.body;
    try{
        if(!fullname || !password || !email){
            return res.status(400).json({error:'One or More field missing'})
        }// This is to make sure all field available or not..
        // This is also called as server side validation...
        const userInDB = await UserModel.findOne({email:email});// email<- it is the field of database,:email<- this is the userinput...
        if(!userInDB){
            res.status(500).json({error:'User with this email already existed'})
        }// This is to make sure that user should signup from unique email or unused email..
        const hashedPassword = await bcryptjs.hash(password,16)
        // This will decrypt our password into unique code...
        const user = new UserModel({fullname,email,password:hashedPassword,profileImg})
        const newUser = await user.save()
        res.status(201).json({result:'User signed up successfully'})
    }
    catch(err){
        res.status(505).json({error:err.message})
    }
})// THis is the api for the signup.
//  Thank's for watching.....


// Create the api for LOGIN of user
// having the fields such as  email, password.

// Let's create the login api for usermodel...

router.post('/login',async(req,res)=>{
    // User Input...
    const {email, password}=req.body;
    try{
        // This is our server-side validation
        if(!email || !password){
            return res.status(404).json({error:'One or more is empty'})
        }
        const userInDB = await UserModel.findOne({email:email})
        if(!userInDB){
            return res.status(401).json({error:'Invalid Credentials'})
        }// If the given email not present inside the Database..
        const didMatch= await bcryptjs.compare(password,userInDB.password)
        // Checking that given password match to the database password.
        // password<-usergiven password,userInDB.password<-is the password parent in the database...

        // if the password match
        if(didMatch){
            const jwtToken = jwt.sign({_id:userInDB._id},jwt_SECERT)
            // this will generate the unique token for the user..
            const userInfo = {'_id':userInDB._id,'email':userInDB.email}
            res.status(200).json({result:{token:jwtToken,user:userInfo}})
        }
    }
    catch(err){
        res.status(505).json({error:err.message})
    }
})// This is the simple example of the login for user
// THank's for watching..........
