const fs=require('fs');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Tour=require('./../models/tourmodel');
const Rest=require('./../models/restmodel');
const Place=require('./../models/placemodel')
const factory=require('./factoryfunction');
//const read=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const apifeature=require('./../utility/features')
exports.alias=(req,res,next)=>{
req.query.page='1';
req.query.sort='price';
req.query.limit='4';
  next();
};

exports.buildrestraunts=async (req,res,next)=>{
try{
  const doc=await Place.create(req.body);
  res.status(200).json({
    status:"success",
    data:{
      Ress:doc
    }
    })
}
catch(err)
{
  console.log(err);
}

}

exports.buildrest=async (req,res,next)=>{
try{
const restdata =await Rest.create(req.body);

res.status(200).json({
  status:"success",
  data:{
    rest:restdata
  }
  })
}
catch(err){
  console.log(err);
}
}

exports.display=(req,res)=>{

res.sendFile('/overview.html');

}


exports.getalltours=factory.getalltours(Tour);


exports.filter=async(req,res)=>{
try{
  console.log(req.query);
  const queryobj={...req.query};
  const exclude=['sort'];
  exclude.forEach(el=>delete queryobj[el]);
  console.log(queryobj);
let querystr=JSON.stringify(queryobj);
querystr=querystr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
console.log(JSON.parse(querystr));

let query=Tour.find(JSON.parse(querystr));

if(req.query.sort){
  query=query.sort(req.query.sort)
}

const read=await query;
/*if(req.query.sort){
  read=read.sort(req.query.sort)
}*/
//{ rating: { gte: '4.5' }, price: '500' }
res.status(200).json({
    status:"success",
    data:{
      read
    }
    });
  }
  catch(err){
    res.status(404).json({
      status:err
      })
}
}
/////Route handlers
exports.getcall=factory.getOne(Tour,{path:'reviews'});


exports.createtour=factory.createOne(Tour);


exports.patchcall=factory.updateOne(Tour);


exports.deletetour=factory.deleteOne(Tour);

exports.gettourwithin=async (req,res,next)=>{
const {distance,latlng,unit}=req.params;
const [lat,lng]=latlng.split(',');
const radius=unit==='mi' ? distance/3963.2:distance/6378.1;

if(!lat || !lng){
  console.log("please mention the latitude");

}
console.log(req.query);
console.log(req.params);
console.log(distance,lat,lng,unit);

const tours=await Tour.find({startLocation:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}});
res.status(200).json({
  status:"success",
  result:tours.length,
  data:{
    data:tours
  }
  })

};
/*try{
  const store={name:req.params.id};

const del=await Tour.deleteOne(store);

       res.status(200).json({

         status:"deleted",

         data:{
           read:del
         }
         })

}
catch(err){
  res.status(400).json({
    status:"error"
    })
}
     }
*/
