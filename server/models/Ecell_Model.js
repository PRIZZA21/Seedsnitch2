const mongoose = require('mongoose');

const ecellSchema = new mongoose.Schema(
    {
        name : { type: String, required: true, minlength: 2, maxlength: 50},
        email: { type: String, required: true, minlength: 5, maxlength: 255, trim: true,lowercase: true},
        logo : { type: String, default: ""},
        college : { type: String, required:true}
    },{ timestamps: true}
);
  
  
module.exports = mongoose.model("Ecell", ecellSchema);
