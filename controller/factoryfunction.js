const apifeature=require('./../utility/features')

exports.deleteOne=Model=>async (req,res)=>{
try{
  const doc={name:req.params.id};

const del=await Model.deleteOne(doc);

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

     exports.updateOne=Model=> async (req,res,next)=>{

     try{
     //const store={name:req.user.id};

     const up= await Model.findByIdAndUpdate(req.user.id,req.body,{
       new:true,
       runValidators:true
       });
     console.log(up);
          res.status(200).json({
            status:"success",
           data:{
               tour:up
           }
            })
          }
          catch(err){
console.log(err);
          }
          }

exports.createOne=Model=>async (req,res,next)=>{
try{

const doc=await Model.create(req.body);
console.log(doc);
  res.status(201).json({
  status:"success",
  data:{
    beta:newTour
  }
});
}
catch(err){
  res.status(400).json({
    status:"fail",
    message:err
    })
}
};
exports.getOne=(Model,popOptions)=>async (req,res,next)=>{
//res.sendFile(path.join(__dirname+'/product.html'));
try{
  let came=Model.findById(req.params.id);
  if(popOptions){
    came=came.populate(popOptions);

  }
  const query=await came;
  res.status(200).json({
    status:'success',
    data:
    {
      query
    }
    });
}
catch(err){
  res.status(404).json({
    status:"failed"
    })
    console.log(err);
}
}


exports.getalltours=Model=> async(req,res,next)=>{
  try{
  console.log(req.user);
  /*const page=req.query.page*1||1;
  const limit=req.query.limit*1 ||100;
  const skip=(page-1)*limit;
  read=read.skip(skip).limit(limit)
  */
  const func=new apifeature(Model.find(),req.query)
  .sort();
  const get=await func.read;
    res.status(200).json({
      status:"success",
      data:{
        get
      }
      });
    }
    catch(err){
      res.status(404).json({
        status:err
        })

    }
  }
