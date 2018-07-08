var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
	product_code : { type : String, unique : true },
	product_name : { type : String, unique : true },
	product_price : Number,
	product_gst   : Number
});


var Product = mongoose.model("Product",productSchema);

module.exports = Product;