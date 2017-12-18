const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


// DB Config
const db = require('./config/database');

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//mongoose middlewares
//maping global promise-get rid of warning
 mongoose.Promise = global.Promise
 //connect to mongoose
 //db.mongoURI
 mongoose.connect('mongodb://localhost/tasktracker-dev', {
   useMongoClient: true
 }).then(function(){
   console.log('mongodb connected----')
  })
   .catch(function(error){
     console.log(error)
  })

//loadin Taks middleware
require('./models/Task')
const Task = mongoose.model('tasks')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Method override middleware
app.use(methodOverride('_method'));

























//index route
app.get('/', function (req, res) {
  res.render("beginnings/index")
})

//about route
app.get('/about', function(req, res){
  res.render('beginnings/about')
})

//tasks/add route
app.get('/tasks/add', function (req, res) {
  res.render('tasks/add')
})

//Edit taks form
app.get('/tasks/edit/:id', function(req, res){
  Task.findOne({
    _id: req.params.id
  })
  .then(function(task){
    res.render('tasks/edit',{
      task:task
    })
  })
})

// Process post route here following REST convention architecture
app.post('/tasks/index', function(req, res) {

  //declaring variables
  let errors = [];

  if(req.body.title == false){
    errors.push({text:'Please add a title'});
  }
  if(req.body.details == false){
    errors.push({text:'Please add some details'});
  }

  if(errors.length > 0){
    res.render('tasks/add', {errors:errors})
  }
  else {
    let newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Task(newUser)
        .save()
        .then(function(tasks){
          res.redirect('/tasks/index')
        })
  }
})

// Edit Form process
app.put('/tasks/index/:id', function(req, res) {
  //declaring variables
  let errors = [];

  if(req.body.title == false){
    errors.push({text:'Please add a title'});
  }
  if(req.body.details == false){
    errors.push({text:'Please add some details'});
  }
  if(errors.length > 0){
    res.render('tasks/edit', {errors:errors})
  }
  else{
    Task.findOne({
      _id: req.params.id
    })
          .then(task => {
              // new values
              task.title = req.body.title;
              task.details = req.body.details;
              task.save()
                    .then(task => {
                      res.redirect('/tasks/index');
      })
    })
  }
})

//Delete tasks
app.delete('/tasks/index/:id', function(req,res){
  Task.remove({
    _id: req.params.id
  })
          .then(function(){
            res.redirect('/tasks/index')
          })
})

//Now get request of the same route following REST convention
app.get('/tasks/index', function(req, res){

  Task.find()
  .then(function(tasks){
    res.render('tasks/index',{
      tasks:tasks
    })
  })
})


//process.env.PORT || 5000
//setting up the port
const port = 5000
app.listen(port, function() {
  console.log(`Server has started on port ${port}`)
})
