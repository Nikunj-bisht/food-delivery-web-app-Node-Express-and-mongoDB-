const fs=require('fs');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User=require('./../models/usermodel');

const factory=require('./factoryfunction');

const filterobj=(obj,...arr)=>{
const newobj={};
Object.keys(obj).forEach(el=>{

  if(arr.includes(el)){
    newobj[el]=obj[el];
  }
  })
  console.log(newobj);
  return newobj;
}

exports.updateuser=factory.updateOne(User);
     exports.deleteuser=async (req,res,next)=>{
try{

     await User.findByIdAndUpdate(req.user.id,{active:false});

            res.status(200).json({

              status:"deleted"

              })
}
catch(err){
  console.log(err);
}

}


exports.getallusers=async (req,res)=>{
try{
/*const page=req.query.page*1||1;
const limit=req.query.limit*1 ||100;
const skip=(page-1)*limit;
read=read.skip(skip).limit(limit)
*/
const func=await User.find();

res.status(200).json({
  status:"success",
  data:{
    users:func
  }
  })


  }
  catch(err){
  console.log(err);

  }
};

exports.getcall=async (req,res)=>{
//res.sendFile(path.join(__dirname+'/product.html'));
try{
  const came=await Tour.findOne(req.params.id);
  res.status(200).json({
    status:'success',
    data:
    {
      came
    }
    });
}
catch(err){
  res.status(404).json({
    status:"failed"
    })
}
}
exports.getme=(req,res,next)=>{
req.params.id=req.user.id;
next();

}
