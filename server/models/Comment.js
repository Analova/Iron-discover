const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    description:String,
    _activity:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Activity"
    },
    _owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
  }
}, 
{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
