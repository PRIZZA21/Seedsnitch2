const path= require('path')
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { normalize } = require('path')
var slugify = require('slugify')

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryconfig')

let destination = 'uploads/';


const storageEngine = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'uploads',
    allowedFormats: ['pdf'],
    destination: function (req, file, cb) {
        cb(null, normalize(destination))
    },

});


const upload = multer(
    {storage: storageEngine,
    limits: {
        fileSize: 10000000 // 1MB in bytes
    }},
);


router.post('/',upload.single('pdf'),(req,res)=>{
    res.send(`${req.file.path}`)
})


//^ Exporting the router 
module.exports = router