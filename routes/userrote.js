
const express=require('express');
const app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const authcontroller=require('./../controller/authcoontroller');
const usercontroller=require('./../controller/usercontroller');
const router=express.Router();



router.get('/getallusers',usercontroller.getallusers);

router.post('/signup',authcontroller.signup);
router.post('/login',authcontroller.login);
router.get('/logout',authcontroller.loggedout);

router.post('/forgetpass',authcontroller.forgetpassword);

router.patch('/resetpass/:token',authcontroller.resetpassword);
router.use(authcontroller.protect);
router.patch('/updatepass',authcontroller.updatepassword);
router.get('/me',usercontroller.getme,usercontroller.getcall);

router.patch('/updateuser',usercontroller.updateuser);
router.delete('/deleteuser',usercontroller.deleteuser);


/*router
  .route('/')
  .get(usercontroller.getallusers)
  .post(usercontroller.createtour);
*/


  module.exports=router;
