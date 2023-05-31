const mongoose = require('mongoose');

const incubatorSchema = new mongoose.Schema(
    {
        name                  : { type: String, required: true, minlength: 5, maxlength: 50},
        email                 : { type: String, required: true, minlength: 5, maxlength: 255, trim: true,lowercase: true},
        active                 : { type: Boolean, required: true, default: true},
        applications_submitted: 
        [{ 
            application_id: {type: mongoose.Schema.Types.ObjectId, ref: "Application",default:null},
            timestamp     : { type: Date, required: true}
        }],
        applications_rejected: 
        [{ 
            application_id: {type: mongoose.Schema.Types.ObjectId, ref: "Application",default:null},
            reason        : { type: String, required:true}
        }],
        applications_accepted: 
        [{ 
            application_id: {type: mongoose.Schema.Types.ObjectId, ref: "Application",default:null},
            reason        : { type: String, required:true}
        }],
    }, {  timestamps: true}
);
  
  
module.exports = mongoose.model("Incubator", incubatorSchema);
