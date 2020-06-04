
const express=require('express');
const app=express();

const tourcontroller=require('./../controller/tourcontroller');


const router=express.Router();


router
.route('/')
.get(tourcontroller.display);

module.exports=router;
