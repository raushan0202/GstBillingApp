var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    methodOverride   = require("method-override"),
    mongoose   = require("mongoose");

var Product = require("./models/entry"),
    Transaction = require("./models/transaction");



//APP CONFIG
mongoose.connect("mongodb://localhost/gstBillingDb");

app.use(bodyParser.urlencoded({extended :true}));
app.use(methodOverride("_method"));
app.use(express.static( __dirname + "/public"));
app.set("view engine","ejs");


app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

//Index Route
app.get("/",function(req,res){
	res.redirect("/product_entry");
});

// entry Route
app.get("/product_entry",function(req,res){
	Product.find({},function(err,foundProducts){
		if(err){
			console.log(err);
			res.redirect('back');
		} else {
			res.render("entry",{ products : foundProducts });

		}
	});
	
});

app.post("/product_entry",function(req,res){
	var product_code  = req.body.pCode;
	var product_name  = req.body.pName;
	var product_price = req.body.pPrice;
	var product_gst   = req.body.pGst;

	var product = { product_code, product_name, product_price, product_gst };

	Product.create(product,function(err,newProduct){
		if(err){
			console.log(err);
			res.redirect('back');
		} else {
			res.redirect("/");
		}

	});
});

//Billing Route
app.get("/billing",function(req,res){
	Transaction.find({},function(err,foundItems){
		if(err)
			console.log(err);
		res.render("billing",{products : foundItems});

	});
	

});

app.post("/billing",function(req,res){
	var product = req.body.product;
	Product.findOne({product_name : product},function(err,foundProduct){
		if(err || foundProduct === null){
			Product.findOne({ product_code : product },function(err,foundProd){
				if(err || foundProd === null){
					console.log(err);
					res.redirect("/billing");
				} else {
					var item = { item_name : foundProd.product_name, item_price : foundProd.product_price,item_gst : foundProd.product_gst };
					Transaction.create(item,function(err,newTransaction){
						if(err){
							console.log(err);
							res.redirect("back");
						} else{
							Transaction.find({},function(err,foundItems){
								res.render("billing",{products : foundItems});

							});
						}

					});

					
				}
			});
		} else {

			var item = { item_name : foundProduct.product_name, item_price : foundProduct.product_price,item_gst : foundProduct.product_gst };
					Transaction.create(item,function(err,newTransaction){
						if(err){
							console.log(err);
							res.redirect("back");
						} else{
							Transaction.find({},function(err,foundItems){
								res.render("billing",{products : foundItems});

							});
						}

					});
		}
	});
});

app.put("/billing",function(req,res){
	var product = {
		product_code : req.body.code,
		product_name : req.body.name,
		product_price : req.body.price,
		product_gst : req.body.gst

	};
	Product.findOne({product_code : req.body.code},function(err,updatedProduct){
		if(err){
			console.log(err);
			res.redirect('back');

		} else{
			updatedProduct.product_code = req.body.code;
			updatedProduct.product_name = req.body.name;
			updatedProduct.product_price = req.body.price;
			updatedProduct.product_gst = req.body.gst;
			updatedProduct.save();

			res.redirect("/product_entry");

		}
	});
});

app.delete("/billing",function(req,res){
	Transaction.deleteMany({},function(err){
		if(err){
			console.log("inside if");
			console.log(err);
			res.redirect('back');
		}
		console.log("outside");
		res.redirect("/billing");
	});
});

app.post("/billing/:name",function(req,res){
	Transaction.findOne({item_name : req.params.name},function(err,foundItem){
		if(err){
			console.log(err);
			res.redirect('back');
		} else{
			foundItem.item_quantity = req.body.quantity;
		    foundItem.save();
		    res.redirect("/billing");
		}
		

	});
});


app.listen(3000, function(){
      console.log("Server has started!!");
});