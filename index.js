//importing modules
var express = require('express');

//var port = process.env.PORT || 3000,
var mongoose = require('mongoose'); //created model loading here
var bodyParser = require('body-parser');
var cors=require('cors');
var path=require('path');

var multer=require('multer');
const ejs=require('ejs');
//var passport = require('passport');

var app = express();

app.use(cors());

//json body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const port=3000;

//connecting to the database
mongoose.connection.on('error',(error)=>{
  if(error){
        console.log(error);
  }
 // console.log('connected to databse at 27017');
});




app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/src/index.html'));
});




/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/src/index.html'));
});*/


//app.use(passport.initializae());
//app.use(passport.session());


mongoose.connect('mongodb://localhost/zillow', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to database Server successfully!');
    }
});


//testing a server
app.get('/',(req,res)=>{
    res.send('testing');
});

app.listen(port,()=>{

console.log('server started at port ' +port);
});

//app.use(passport.initialize());
//app.use(passport.session);

//define routes
const route=require('./api/routes/route');
const userRoute=require('./api/routes/user');
//require('./api/config/passport')(passport);

//config files
const config =require('./api/config/passport');

app.use('/zillow', route);
app.use('/user', userRoute);

//define static file
//app.use(express.static(path.join(__dirname,'views')));