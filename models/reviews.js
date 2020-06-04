const mongoose=require('mongoose');

const review=new mongoose.Schema({

  name:{
    type:String,
    required:[true,'cannot be empty']
  },
  rating:{
    type:String,
    min:1,
    max:5
  },
  createadat:{
    type:Date,
    default:Date.now()
  },
  tour:{
    type:mongoose.Schema.ObjectId,
    ref:'Tour',
    required:[true,'Review must belong to a tour']
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,'Review must belong to user']
  }
  },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
    });

review.pre(/^find/,function(next){
  this.populate({
      path:'user',
      select:'name photo'
      });
      next();
  });

  const Review=mongoose.model('Review',review);
  module.exports=Review;
