const express=require('express');
const viewcontroller=require('./../controller/viewcontroller');
const router=express.Router();
const authcontroller=require('./../controller/authcoontroller');
const bookingcontrolle=require('./../controller/bookingcontroller');

router.get('/me',authcontroller.protect,viewcontroller.getaccount);

router.use(authcontroller.loggedin);
router.get('/display',viewcontroller.getoverview);

router.post('/display',viewcontroller.getoverview);

router.get('/login',viewcontroller.getlogin);
router.get('/signup',viewcontroller.signup);


  router.get('/tour/:id',bookingcontrolle.createbooking,viewcontroller.gettour);

module.exports=router;
