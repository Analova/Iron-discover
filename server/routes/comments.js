const express = require('express');
const Comment = require('../models/Comment')

const router = express.Router();

//Delete comment
router.delete("/:id" , (req,res,next)=>{
    Comment.findByIdAndRemove(req.params.id)
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

  //Update
  router.patch("/:id", (req,res,next)=>{
    let{name,picture,description,category}=req.body
    Comment.findById(req.params.id,{name,picture,description,category})
        .then(comment=>{
        res.json({
        success:true,
        comment
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