const express = require('express');
const Activity = require('../models/Activity')
const Comment= require('../models/Comment')
const {isLoggedIn} = require('../middlewares')

const router = express.Router();

// Router to get all activites
router.get("/" ,(req,res,next)=>{
Activity.find()
.then(activities=>{
  res.json(activities);
})
.catch(err=>next(err))
})

// Route to add an activity
router.post("/",isLoggedIn,(req,res)=>{
  let{name,picture,description,category}=req.body
  Activity.create({name,picture,description,category})
  .then(activity=>{
    res.json({
      success:true,
      activity
    })
  })
  .catch(err=>next(err))
})

//Route to check just one activity and get all the comments with the comments._activity = req.params.id
router.get('/:id', (req, res, next) => {
  Activity.findById(req.params.id)
  .then(activity => {
    Comment.find({_activity:req.params.id})
    .then(
      comments => {
        res.json({
        success:true,
        activity,
        comments
      })
    })
  .catch(err=>next(err))
  });
});


// Route to add a comment related to an activity
router.post("/:id/comments", isLoggedIn, (req,res,next)=>{
  let {description} = req.body
  let _activity = req.params.id
  let _owner=req.user._id
  
  Comment.create({description,_activity,_owner})
      .then(comment=>{
        res.json({
          success:true,
          comment
        })
      })
  .catch(err=>next(err))
  })

  
  
  //Update
    router.patch("/:id", (req,res)=>{
      let{name,picture,description,category}=req.body
      Activity.findByIdAndUpdate(req.params.id,{name,picture,description,category}, {new:true})
      .then(activity=>{
        res.json({
          success:true,
          activity
        })
      })
      .catch(error=>{
        return{
          success:false,
          error:err
        }
      })
    })

    // Delete an activity
  router.delete("/:id" , (req,res,next)=>{
    Activity.findByIdAndRemove(req.params.id)
    .then( ()=> {
      res.json({
        success: true,
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
  