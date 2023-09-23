app.use(express.static(path.join(__dirname,'public')))
// Configure Multer for handling file Uploads...
const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null,'uploads/');// create the uploads folder...
  },
  filename:function(req,file,cb){
    const ext = path.extname(file.originalname)
    cb(null,Date.now() +ext)
  }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return res.status(400).json({ error: "File types allowed are .jpeg, .png, .jpg" });
        }
    }
});

// POST request to handle image uploads...
app.post('/uploads',upload.single('image'),(req,res)=>{
  if(req.file){
    res.json({message:'Image Uploaded Successfully'})
  }
  else{
    res.status(400).json({error:'No file Uploaded'})
  }
})
app.get('/files/:filename', async (req, res) => {
    try {
      const filename = req.params.filename;
      const path = __basedir + '/uploads/';
      const fullPath = path + filename;
  
      await res.download(fullPath);
  
    } catch (error) {
      res.status(500).send({ message: 'File cannot be downloaded ' + error });
    }
  });
  