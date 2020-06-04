const dotenv=require('dotenv');
const mongoose=require('mongoose');
const app=require('./app');
dotenv.config({path:'./config.env'});

mongoose.connect(process.env.DATABASE_LOCAL,{
  useUnifiedTopology: true,
  useCreateIndex:true,
  useNewUrlParser:true,
  useFindAndModify:false
  }).then((conn)=>console.log("Connected to DB"));


const port=3000;

app.listen(port,()=>{
console.log(`app running on port ${port}`);

});
// testfffff
