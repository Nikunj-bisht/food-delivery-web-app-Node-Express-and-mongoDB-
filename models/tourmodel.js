
const mongoose=require('mongoose');

const tourschema=new mongoose.Schema({
   name:{
     type:String,
     required:[true,"must have a name"],
     unique:true,
     trim:true
     },
     duration:{
       type:Number

     },
     maxGroupSize: {
       type: Number,
       required: [true, 'A tour must have a group size']
     },
     difficulty: {
       type: String,
       required: [true, 'A tour must have a difficulty'],
       enum: {
         values: ['easy', 'medium', 'difficult'],
         message: 'Difficulty is either: easy, medium, difficult'
       }
     },

   ratingsAverage:{
     type:Number,
     default:4.5
     },
   price:{
    type:Number,
    required:[true,"must have a price"]
  },
  priceDiscount:Number
  ,summary:{
    type:String,
    trim:true,
    required:[true,'A tour must have adescription']
  },
  description:{
    type:String,
    trim:true
  },
  imageCover:{
    type:String,
    required:[true,'must have a image']
  },
  images:[String],
  createdAt:{
    type:Date,
    default:Date.now()
  },

  startDate:[Date],
  startLocation:{
    type:{
      type:String,
      default:'Point',
      enum:['Point']
    },
    coordinates:[Number],

  },
  locations:[{

    type:{
      type:String,
      default:'Point',
      enum:['Point']
    },
    coordinates:[Number],
    address:String,
    day:Number
    }],
    guides:[
    {
      type:mongoose.Schema.ObjectId,
      ref:'User'
    }
    ]


  },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
    });
tourschema.virtual('duratioinWeeks').get(function(){
  return this.duration/7;
  });

tourschema.virtual('reviews',{
  ref:'Review',
  foreignField:'tour',
  localField:'_id'
  })
/*tourschema.pre('save',tourschema);
console.log(this);*/

  const Tour=mongoose.model('Tour',tourschema);



  module.exports=Tour;
