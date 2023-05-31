// Importing the requred dependencies
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;


const dotenv = require('dotenv');
dotenv.config()

const path = require('path');
const passport = require("passport");
const session = require('express-session');
const cookieSession = require('cookie-session')
const passportSetup = require('./config/PassportGoogle')


// Importing the required configurations for server
const connectDB = require('./config/Database.js');


// Importing the required routes
const users = require('./routes/User_Routes');
const replies = require('./routes/Reply_Routes');
const posts = require('./routes/Post_Routes');
const applications = require('./routes/Application_Routes');
const incubators = require('./routes/Incubator_Routes');
const ecells = require('./routes/Ecell_Routes');
const blogs = require('./routes/Blog_Routes');
const ambassador = require('./routes/Ambassador_Routes');
const uploadRoutes = require('./routes/Upload_Routes');
const Upload_Pdf_Routes = require('./routes/Upload_Pdf_Routes');


// Setting up express and port for running server
const app = express();
const port = process.env.PORT || 4000;



app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
  
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Setting up the environmnet file and loading the database
dotenv.config();
connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(passport.initialize())
app.use(passport.session());





// Using all the middlewares required
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }
));


// Using the routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/replies', replies);
app.use('/api/applications', applications);
app.use('/api/incubators', incubators);
app.use('/api/ambassador', ambassador);
app.use('/api/ecells', ecells);
app.use('/api/blogs', blogs);
app.use('/api/uploads', uploadRoutes);
app.use('/api/uploadpdf', Upload_Pdf_Routes);


// Setting up the static files
app.use(express.static('uploads'));


// Setting up views Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'../','/client/build')))
app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'../', 'client', 'build','index.html')));


// Starting the server
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});