const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title      : { type: String,required: true, minlength: 1,maxlength: 80, },
    banner: { type: String,required: true},
    content: { type: String, required: true, minlength: 5, required: true,},
    author     : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    views      : { type: Number, default: 1,min: 1 },
    upvotes    : { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: []},
  },
  {timestamps:true}
);


module.exports =  mongoose.model("Blog", blogSchema);
