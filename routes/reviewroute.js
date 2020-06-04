const express=require('express');
const reviewcontroller=require('./../controller/reviewcontroller');
const authcontroller=require('./../controller/authcoontroller');
const router=express.Router({mergeParams:true});
router.use(authcontroller.protect);
router
.route('/')
.get(reviewcontroller.getallreviews)
.post(reviewcontroller.createreview);


router.route('/:id').delete(reviewcontroller.deletereview);
module.exports=router;
