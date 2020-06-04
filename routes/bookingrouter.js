const express=require('express');
const bookingcontroller=require('./../controller/bookingcontroller');
const authcontroller=require('./../controller/authcoontroller');
const router=express.Router();

router.get('/checkout-session/:id',authcontroller.protect,bookingcontroller.getcheckout);

module.exports=router;
