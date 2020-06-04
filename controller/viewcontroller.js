
const Tour=require('./../models/tourmodel');
const Place=require('./../models/placemodel');

const Rest=require('./../models/restmodel');

exports.getoverview=async (req,res,next)=>{

try{
  const place=req.body.place;
console.log(place);
//const tour=await Tour.find();
const rest=await Place.findOne({name:place});
  res.status(200).render('over',{
    title:'all tour',
    rest
    });
  }
  catch(err){
    console.log(err);
  }
}


  exports.gettour=async (req,res,next)=>{
    try{
const tours=await Rest.findOne({name:req.params.id});
console.log(tours);
    res.status(200).render('tour',{
      title:'the tour',
      tours
      });
    }
catch(err){
  res.status(200).render('error'),{
    title:'something went wrong',
    msg:'404 NOT FOUND'
  }
}
  }

    exports.getlogin=async(req,res,next)=>{

      res.status(200).render('login',{
        title:'login'
        })
    }
exports.signup=async(req,res,next)=>{

  res.status(200).render('signup',{
    title:'sign'
  })
}
exports.getaccount=(req,res,next)=>{
  res.status(200).render('account',{
    title:'login'
    });
}