const path = require("path");
const multer = require("multer");
const mongoose  = require("mongoose");
const File = mongoose.model("file");
const User = mongoose.model('users');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// const storage = multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function(req, file, cb){
//        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
//  });

// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: function(req, file, cb){
//        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
//  });
 
const upload = multer({dest: 'uploads/'}); // maybe specify more but look in docs first and also have Validation!
 

module.exports = app => {

    app.post('/api/image_upload', upload.single('myImage'), (req, res) => {
        const userId = req.user._id
        User.findOne({_id: userId})
        .then((user) => {
            user.image.meta_data = req.file;

            user.save()
            .then((user) => {
                console.log(user);
                res.send(user);
            })
            .catch((e) => {
                console.log(e);
            });
        });
    });

}
