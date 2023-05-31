const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name                  : { type: String, required: true, minlength: 3, maxlength: 50},
    email                 : { type: String, required: true, minlength: 5, maxlength: 255, trim: true,lowercase: true},
    startup_name          : { type: String, required: true},
    linkedin_profile      : { type: String, required: true,  },
    college_name          : { type: String, required: true,  },
    contact_number        : { type: Number, required: true,   },
    startup_stage         : { type: String, required: true},
    startup_problem       : { type: String, required: true },
    startup_differentiator: { type: String, required: true },
    curr_status           : { type: String, default: "Applied"},
    assigned_incubator    : { type: mongoose.Schema.Types.ObjectId, ref: "Incubator", default: null },
    creator               : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    pitch_deck            : { type: String, default: ""}
  },
  { 
    timestamps: true
  }
);


module.exports = mongoose.model("Application", applicationSchema);

