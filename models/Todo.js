var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var Todo = new Schema({
	title:  		{type: String},
	description:	{type: String},
	which_list: 	{type: Number},
	which_board:  	{type: Number},
	which_user:		{type: Object},
	status:   		{type: String},
	created_at:		{type: Date},
	due_date:		{type: Date}
});

module.exports = mongoose.model('Todo', Todo)