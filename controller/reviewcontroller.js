
const mongoose=require('mongoose');
const Review=require('./../models/reviews');
const factory=require('./factoryfunction');

exports.getallreviews=async (req,res,next)=>{
let filter={};
if(req.params.tourid){
  filter={tour:req.params.id};
}

  const reviews=await Review.find();

  res.status(200).json({
    status:'success',
    result:{
      reviews
    }
    });
}
exports.createreview=async(req,res,next)=>{
try{
  if(!req.body.tour){
    req.body.tour=req.params.tourid;
  }
  if(!req.body.user){
    req.body.user=req.user.id;
  }
  const create=await Review.create(req.body);

  res.status(200).json({
    status:'success',
    data:{
      review:create
    }
    });
}
catch(err){
  console.log(err);
}

}
exports.deletereview=factory.deleteOne(Review);
