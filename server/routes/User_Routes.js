const express = require("express");
const { registerUser, authenticateUser, getUserProfile, updateUserProfile } = require("../controllers/User_Controllers");
const router = express.Router();
const passport = require("passport");

// Middleware to protect various routes
const { protect } = require("../middlewares/Authorization");
const generateToken = require("../utilities/TokenGeneration");


router.post('/signup',registerUser)
router.post('/signin',authenticateUser)

router.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile)



// Managing the google authentication using passport

router.get('/glogin/success',(req,res)=>{

    if (req.user) {
        res.status(200).json({
            _id:req.user._id,
            name:req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin,
            isIncubator: req.user.isIncubator,
            token: generateToken(req.user._id),
            profile_pic : req.user.profile_pic
        });
    }
    else{
        res.status(400).json({error:"Please try again"})
    }
})


router.get('/glogin/failed',(req,res)=>{
    res.status(400).json({error:"Please try again"})
})


router.get("/glogout", (req, res) => {
    req.logout();
    res.redirect('https://seed-snitch-server.onrender.com/');
});


router.get("/auth/google", passport.authenticate("google", ["profile", "email"]));

router.get("/auth/google/callback",
	passport.authenticate("google", {
		successRedirect : 'https://seed-snitch-server.onrender.com/',
		failureRedirect : '/api/users/glogin/failed'
	}),
);

module.exports = router
