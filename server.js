const path = require('path');
require('dotenv').config()
const express = require('express')
const moment = require('moment')
const app = express()
app.set('view engine','ejs')
const port = process.env.PORT || 3000
const Task = require('./models/tasks')
app.use(express.static(__dirname + '/views/'));
app.use(express.urlencoded({ extended:true }));
// const root = path.join(__dirname)+"/views/"

const mongoose = require('mongoose');
const task = require('./models/tasks');
const mongoDB = process.env.DB_CONNECT;

mongoose.connect(mongoDB,{useNewUrlParser:true , useUnifiedTopology:true }).then(()=>{
  console.log('Connected using old way');
  app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`)
  });
}).catch(err => {
  console.log(err);
})

// const uri = "mongodb+srv://sahil:sahil1234567890@cluster0.rhpkj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("CONNECTED SUCESSFULLY");
  
//   // perform actions on the collection object
//   client.close(); 
// });

// app.get('/create-task',(req,res)=>{
//   const task = new Task({
//     srno:3,
//     name:"Make Food",
//     status:'Done'
//   });
//   task.save().then(result=>res.send(result))
// })

app.get('/get-items',(req,res)=>{
  
  Task.find().then(result => {
    // res.send(result);
    res.render('index',{tasks:result, title:'TODO APP', head:'TODO PAGE'})
  }).catch(err =>{
    console.log(err);
  })
})

app.get('/', (req, res) => {
  // res.render('index',{tasks,title:'TODO APP',head:'TODO PAGE'})
  res.redirect('/get-items')
})
app.get('/add-items',(req,res) => {
    res.render('add-items',{title:'ADD-ITEMS',head:'Add ITEMS PAGE'})
})
// app.get('/testing',(req,res) => {
//   Task.findById("60dc0f406f85241e6893b7d2").then(result =>{
//     console.log(moment().format("D-M-Y min",result.createdAt))
//     res.send(200,result);
//   }).catch(err =>{
//     console.log(err)
//   })
// })

app.post('/tasks', (req,res)=>{
  // console.log(req.body)
  const task = new Task(req.body);
  task.save().then(result => {
    res.redirect('/get-items');
  }).catch(err => {
    console.log(err);
  })
})

app.get('/tasks/:id',(req,res)=>{
  // console.log(req.params)
  const id = req.params.id
  Task.findById(id).then(result=>{
    res.render('task-details', {task:result , title:'Edit Item',head:'Edit ITEMS PAGE'})
  })
})

app.get('/search/:name',(req,res)=>{
  const name = req.params.name
  var regex = new RegExp(name , 'i')
  task.find({name:regex}).then(result => {
    res.render('index',{tasks:result, title:'TODO APP', head:'Searching..'})
  })
})

app.put('/tasks/:id',(req,res)=>{
  // console.log(req.params)
  const id = req.params.id
  Task.findByIdAndUpdate(id , req.body).then(result=>{
    
  })
})

app.delete('/tasks/:id',(req,res)=>{
  // console.log(req.params)
  const id = req.params.id
  Task.findByIdAndDelete(id).then(result=>{
    
  })
})

app.use((req,res)=>{
    res.render('error404',{title:'404 NOT FOUND',head:'PAGE NOT FOUND'})
})

