var mongoose = require('mongoose'),
	Schema = mongoose.Schema;



// todo model
var todoSchema = new Schema({
    content: String,
		priority: { type: Number},
    completed: { type: Boolean, default: false },
		due_date: {type: Date},
    updated_at: { type: Date, default: Date.now }
});

mongoose.model('Todo', todoSchema);
