const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require("passport");
const User_Model = require("../models/User_Model");


passport.use(
	new GoogleStrategy(
	{
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		callbackURL: "/api/users/auth/google/callback",
		scope: ["profile", "email"]
	},
	function (accessToken, refreshToken, profile, done) {
		User_Model.findOne({email: profile.emails[0].value})
			.then((user)=>
			{
				let pwd= 'Shivam@12';
				if(user) {return(done(null,user))}
				else{
                    User_Model.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password: pwd
                    })
					.then((user)=>{
						return done(null,user)
					})
					.catch((err)=>{
						console.log("Error in creating user by google oauth", err);
						return done(null,err);
					})
				}
			})
			.catch((err)=>{
				console.log("Error un creating user by google oauth",err);
				return console.log(err);
			})
    })
)
			
	 

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(uid, done) {
	if (uid === "logout") {
		done(null, false);
	} 
	else{
        User_Model.findById(uid)
        .then(
            user => {
                done(null, user); 
            }
        )
        .catch(err => done(err))
	}
});