const stripe=require('stripe')('sk_test_At2HYMDUeYWF0lsCsnlxXHU500YnrA3JMp');
const Rest=require('./../models/restmodel');
const Booking=require('./../models/booking');
exports.getcheckout=async(req,res,next)=>{
try{
    const data=await Rest.findOne({name:req.params.id});
console.log(data);
const session=await stripe.checkout.sessions.create({
    payment_method_types:['card'],
success_url:`${req.protocol}://${req.get('host')}/search/tour/${data.name}?rest=${data.id}&user=${req.user.id}&price${data.price}`,
cancel_url:`${req.protocol}://${req.get('host')}/search/tour/${data.name}`,
customer_email:data.email,
client_reference_id:data.id,
line_items:[{
    name:`${data.name} Restraunt`, 
    description:data.summary,
    images:[`http://127.0.0.1:3000/img/tours/${data.images}`],
    amount:data.price,
    currency:'usd',
    quantity:1
}]    
});

res.status(200).json({ 
    status:'success',
    session
})

}
catch(err){
    console.log(err);
}
}

exports.createbooking=async (req,res,next)=>{

const {rest,user,price}=req.query;

if(!rest || !user || !price) return next();

const book=await Booking.create({rest,user,price});
console.log(book);
res.redirect(req.originalUrl.split('?')[0]);
}