const {promisify}=require('util');
const crypto=require('crypto');

const User=require('./../models/usermodel');
const jwt=require('jsonwebtoken');
const Email=require('./../utility/email');
exports.signup=async (req,res)=>{
try{
  console.log(req.body);
  const newuser=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm,
    passwordchanged:req.body.passwordchanged,
    role:req.body.role
    });
    const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    const url=0;
   await new Email(newuser,url).sendWelcome();
    /*await Email({
      email:req.body.email,
    message:'Welcome to licius',
    id:req.body.email
    });*/

  res.status(200).json({
    status:'success',
    token,
    data:{
      user:newuser
    }
    });
  }
  catch(err){
    console.log(err);
  }
};

exports.login=async (req,res,next)=>{
  try{
  const {email,password}=req.body;
console.log(email,password);
  if(!email || !password){
      console.log('please provide with correct');
return;
  }
  const user=await User.findOne({email}).select('+password');
console.log(user);
const correct=await user.correctPassword(password,user.password);
if(!user || !correct){
  console.log('incorrect pass');
  return;
}

const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
console.log(token);
const cookieoptions={
  expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),

  httpOnly:true
  }
if(process.env.NODE_ENV==='production') cookieoptions.secure=true;
res.cookie('jwt',token,cookieoptions);

res.status(200).json({
  status:"success",
  token,
 data:{
   user
 }
  })
}

catch(err){
res.status(400).json({
  status:"failed"
  })
  console.log(err);
}
}
exports.protect=async (req,res,next)=>{

  let token;

if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
  token=req.headers.authorization.split(' ')[1];
}

else if(req.cookies.jwt) {
  token=req.cookies.jwt;
}
console.log(token);
const decode=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
console.log(decode);
const fresh=await User.findById(decode.id);

if(!fresh){
  return ;
}

//4
if(fresh.changedPasswordafter(decode.iat)){
  console.log("please log again");
  res.status(200).render('error'),{
    title:'something went wrong',
    msg:'404 NOT FOUND'
  }
  return;
}
req.user=fresh;
res.locals.user=fresh;
console.log(req.user);
next();
};

exports.loggedin=async (req,res,next)=>{

if(req.cookies.jwt) {
  try{
  const decode=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
  console.log(decode);

  const fresh=await User.findById(decode.id);


  if(!fresh){
    return next();
  }

  //4
  if(fresh.changedPasswordafter(decode.iat)){
    console.log("please log again");
    return next();
  }
  res.locals.user=fresh;
  console.log(req.user);
  return next();
}
catch(err){
  return next();
}
}
next();
};

exports.loggedout=(req,res,next)=>{

  res.cookie('jwt','loggedout',{
    expires:new Date(Date.now()+10*1000),
    httpOnly:true
    });
    res.status(200).json({
      status:"success"
      })
}


exports.updatepassword=async (req,res,next)=>{
try{

  console.log(req.user);
const users=await User.findById(req.user.id).select('+password');

if(!await(users.correctPassword(req.body.passwordcurrent,users.password))){
  console.log("wrong");
  return ;
}

users.password=req.body.password;
users.passwordConfirm=req.body.passwordConfirm;
await users.save();

const token=jwt.sign({id:users._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
res.status(200).json(({
status:"updated",
  token,
  updatedpassword:users.password
  }))
}
catch(err){
  console.log(err);
}

}

exports.restricto= (...roles)=>{

   return (req,res,next)=>{

          if(!roles.includes(req.user.role)){
                console.log("you cant delete")
            return;
          }


   next();
}
}
exports.forgetpassword=async (req,res,next)=>{

  const user=await User.findOne({email:req.body.email});
   if(!user){
     console.log("You are not here");
     return ;
   }

   const resettoken=user.generatetoken();
   await user.save({validateBeforeSave:false});

const reseturl=`${req.protocol}://${req.get('host')}/api/v1/users/resetpass/${resettoken}`;


await mail({
  email:user.email,
message:`forgot your password click here to change ${reseturl}`
});

res.status(200).json({
  status:"success",
  message:"sent",

  })
}
exports.resetpassword=async (req,res,next)=>{
  //get user
const hashedtoken=crypto.createHash('sha256').update(req.params.token).digest('hex');

const user=await User.findOne({passwordresettoken:hashedtoken,passwordresetExpires:{$gt:Date.now()}});

if(!user){
  console.log("invalid");
  return;
}

user.password=req.body.password;
user.passwordConfirm=req.body.passwordConfirm;
user.passwordresettoken=undefined;
user.passwordresetExpires=undefined;
await user.save();

const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
res.status(200).json(({
status:"Send"
  ,token
  }))
};
