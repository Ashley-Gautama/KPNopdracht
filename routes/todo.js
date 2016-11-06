var moment = require('moment');


var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');

module.exports = {

    all: function(req, res){
        console.log('we are in todo.all')
        Todo.find({}, function(err, todos){
            if(err) res.render('error', { error: 'Could not fetch items from database :('});
            console.log('in the callback')
            res.render('todos', { todos: todos, moment: moment });
        });
    },

    sortByDate: function(req,res){
        console.log("sorting by date...")
        Todo.find({}, null, {sort: {due_date: 1}}, function(err, docs) {
          res.render('todos', { todos: docs, moment: moment });
        });
    },

    sortByPriority: function(req,res){
        console.log("sorting by priority")
        Todo.find({}, null, {sort: {priority: 1}}, function(err, docs) {

          res.render('todos', { todos: docs, moment: moment });
        });
    },

    markCompleted: function(req, res, next) {
      Todo.findOneAndUpdate({completed: false}, {$set:{completed:true}},function(err, doc){
        if(err){
          console.log("Something wrong when updating data!");
        }
        res.redirect('/todos');
      });
    },

    viewOne: function(req, res){
        Todo.find({ _id: req.params.id }, function(err, todo){
            res.render('todo', { todo: todo[0] })
        });
    },
    create: function(req, res, next){
      if (!req.body || !req.body.content || !req.body.due_date || !req.body.priority)
        return res.render("error", {error: "Please fill in all the  fields!" });


        // create todo
    Todo.create(req.body, function (err, post) {
            if(err) res.render('error', { error: 'Error creating your todo :('})
            // reload collection
            res.redirect('/todos');
        });
    },
    destroy: function(req, res){
        var id = req.params.id;

        Todo.findByIdAndRemove(id, function(err, todo){
            if(err) res.render('error', { error: 'Error deleting todo'});
            res.redirect('/todos');
        });
    },
    edit: function(req, res){
        Todo.findOneAndUpdate( req.params.id, req.body, function(err, todo){

            res.redirect('/todos');
        });
    }

};
