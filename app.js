var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");




//APP CONFIG
mongoose.connect("mongodb://localhost/gstBillingDb");

app.use(bodyParser.urlencoded({extended :true}));
app.use(express.static( __dirname + "/public"));
app.set("view engine","ejs");


app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});


app.get("/",function(req,res){
	res.redirect("/product_entry");
});

app.get("product_entry",function(req,res){
	res.render("entry");
});



app.listen(3000, function(){
      console.log("Server has started!!");
});