const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true});

const task = mongoose.model('todo',taskSchema)
module.exports = task