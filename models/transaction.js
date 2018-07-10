var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({

	item_name : { type : String, unique : true },
	item_price : Number,
	item_gst   : Number,
	item_quantity : { type : Number, default : 0 }
});


var Transaction = mongoose.model("Transaction",transactionSchema);

module.exports = Transaction;