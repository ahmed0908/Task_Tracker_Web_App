const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a Schema
const TaskSchema = new Schema({
  title:{
    type: String,
    require:true
  },
  details:{
    type: String,
    require: true
  },
  date:{
    type: Date,
    default: Date.now
  }
})

mongoose.model('tasks', TaskSchema)
