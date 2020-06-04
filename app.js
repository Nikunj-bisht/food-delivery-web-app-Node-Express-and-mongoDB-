const express=require('express');
const morgan=require('morgan');
const app=express();
const path = require('path');
var bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());

const toursrouter=require('./routes/routers.js');
const userrouter=require('./routes/userrote.js');
const filterrouter=require('./routes/filter.js');
const reviewrouter=require('./routes/reviewroute.js');
const showoverview=require('./routes/overview.js');
const bookrouter=require('./routes/bookingrouter.js');

const viewrouter=require('./routes/viewroutes.js');
//const displayrouter=require('./routes/dis.js');
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
// 3rd party middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.json());
//const product=fs.readFileSync(`${__dirname}/fst/product.html`,'utf-8');
app.use((req,res,next)=>{
  req.requestTime=new Date().toISOString();
  console.log(req.cookies);
  next();
  })
  app.get('/api/v1/overview', function (req, res) {
    // res.send('Hello World');
    res.sendFile(__dirname + 'overview.html');
  });
  app.get('/',function (req, res) {
    // res.send('Hello World');
    res.sendFile(__dirname + '/public/index.html');
  });
app.use('/search',viewrouter);

app.use('/api/v1/tours',toursrouter);
app.use('/api/v1/filter',filterrouter);
//app.use('/api/v1/exp',displayrouter);
app.use('/api/v1/users',userrouter);
app.use('/api/v1/reviews',reviewrouter);
app.use('/api/v1/bookings',bookrouter);
app.use('/api/v1/restraunt',toursrouter);


/*  app.post('/',(req,res)=>{

    })*/

module.exports=app;
