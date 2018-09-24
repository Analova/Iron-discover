const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name:String,
    picture:String,
    description:String, 
    category:String
}, 
{
    timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
  });

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
