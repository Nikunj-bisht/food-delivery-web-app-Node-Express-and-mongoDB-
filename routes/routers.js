
const express=require('express');
const app=express();

const tourcontroller=require('./../controller/tourcontroller');
const authcontroller=require('./../controller/authcoontroller');
const reviewRouter=require('./../routes/reviewroute');
const router=express.Router();

router.use('/:tourid/reviews',reviewRouter);
/*router
.route('/')
.post(authcontroller.protect,authcontroller.restricto('user'),reviewcontroller.createreview);
*/
router
.route('/top-5tours')
.get(tourcontroller.alias,tourcontroller.getalltours);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourcontroller.gettourwithin);


router
  .route('/')
  .get(tourcontroller.getalltours)

  .post(authcontroller.protect,authcontroller.restricto('admin','lead'),tourcontroller.createtour);


router
  .route('/:id')
  .get(tourcontroller.getcall)
  .patch(authcontroller.protect,authcontroller.restricto('admin','lead'),tourcontroller.patchcall)
  .delete(authcontroller.protect,authcontroller.restricto('admin','lead'),tourcontroller.deletetour);

router.use('/rest',tourcontroller.buildrest);
router.use('/placerestraunt',tourcontroller.buildrestraunts);

  module.exports=router;
