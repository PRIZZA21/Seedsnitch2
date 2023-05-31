const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title      : { type: String,required: true },
    description: { type: String, required: true, required: true,},
    author     : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    views      : { type: Number, default: 1,min: 1 },
    upvotes    : { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: []},
    time       : { type: Date, default: Date.now},
  },{ timestamps: true}
);


module.exports =  mongoose.model("Post", postSchema);
