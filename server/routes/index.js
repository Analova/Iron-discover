const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require('../models/User')


// Route to  GET /profile and all the comments  with the comments._owner = req.user._id
router.get('/profile/:id',isLoggedIn, (req,res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.json({
      success:true,
      user
    })
  })
  .catch(error=>{
    return{
      success:false,
      error:err
    }
  })
});

// Route to PATCH /profile
router.patch("/profile/:id", (req,res,next)=>{
  let{img,info}=req.body
  User.findByIdAndUpdate(req.params.id,{img, info}, {new:true})
  .then(user=>{
    res.json({
      success:true,
      user
    })
  })
  .catch(error=>{
    return{
      success:false,
      error:err
    }
  })
})

module.exports = router;
