const crypto=require('crypto');
const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const userschema=new mongoose.Schema({
name:{
  type:String,
  required:[true,'Enter your name']
},
email:{
  type:String,
  required:true,
  unique:true,
  lowercase:true,
  validate:[validator.isEmail]
},
photo:String,
role:{
type:String,
enum:['user','guide','lead','admin'],
default:'user'
},
password:{
  type:String,
  required:true,
  minlength:8,
  select:false
},
passwordConfirm:{
  type:String,
  required:true,
  validate:{
    validator:function(el){
      return el=this.password;
    },
    message:'password not same'
  }
},
passwordchanged:Date,
passwordresettoken:String,
passwordresetExpires:Date,
active:{
  type:Boolean,
  default:true,
  select:false
}
});
userschema.pre('save',async function(next){  //run only when we signup

      if(!this.isModified('password')){
        return next();
            }
            this.password=await bcrypt.hash(this.password,12);

            this.passwordConfirm=undefined;
            next();
            });

userschema.pre(/^find/,function(next){

this.find({active:{$ne:false}});

  next();
  })

userschema.methods.correctPassword=async function(candidatepass,userPassword){
return await bcrypt.compare(candidatepass,userPassword);
};


userschema.methods.changedPasswordafter=function(JWTTimestamp){

if(this.passwordchanged){
const changedtime=this.passwordchanged.getTime()/1000;

    console.log(changedtime,JWTTimestamp);
    return JWTTimestamp<changedtime;
}

  return false;
}
userschema.methods.generatetoken=function(){
   const generate=crypto.randomBytes(32).toString('hex');


   this.passwordresettoken=crypto.createHash('sha256').update(generate).digest('hex');
   console.log({generate},this.passwordresettoken);

   this.passwordresetExpires=Date.now()+10*60*1000;
   return generate;
}


  const User=mongoose.model('User',userschema);

  module.exports=User;
