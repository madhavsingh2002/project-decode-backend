// Create the api for uploading the image and downloading it...
app.use(express.static(path.join(__dirname,'public')))
// Configure the multer
const storage =  multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')// Create the uploads folder....
    },
    filename:function(req,file,cb){
        const ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
})// This is the function for configure the storage for uploads or store the image.

const upload = multer({
    storage:storage,// This is our storage..
    limits:{
        fileSize: 1024 * 1024*1
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=='image/png'|| file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){
            cb(null,true);// define the file type for image..

        }
        else{
            cb(null,false);
            return res.status(404).json({error:'file types allowed are only .jpeg .png .jpg'})
        }
    }
})
// we create the store and upload for image 
// now create the api for upload.
app.post('/uploads',upload.single('image',(req,res)=>{
    if(req.file){
        res.json({message:'Image uploaded Successfully'})
    }
    else{
        res.status(400).json({error:'no file uploaded'})
    }
}))// This is the simple api to upload the image.
// Create the api for downloading....
app.get('/files/:filename',async(req,res)=>{
    try{
        const filename = req.params.filename;
        const path = __basedir + '/uploads/'
        const fullpath = path + filename;
        await res.download(fullpath);

    }
    catch(err){
        res.status(500).send({message:'File cannot be downloaded'+err})
    }
})
// THank's for watching.....................
