
function submitQuantity(name,id){
	$.ajax({
		url : '/billing/' + name,
		data: {"quantity": ($("#quantity" + id).val())},
		type: 'POST',
		success:function(result){
			//console.log(result);
			//$("#productContainer").html(result);
			window.location.reload();

		}
	});
	
	
	//$("#newCommentForm_reset").click();
}

function Delete(){
	$.ajax({
		url : '/billing' +'?_method=DELETE',
		type: 'POST',
		success:function(result){
			//console.log(result);
			//$("#productContainer").html(result);
			window.location.reload();

		}
	});

}

function storeInLocalStorage(product){
         	var Product = { name : product.product_name, gst : product.product_gst, price : product.product_price };
            var n = localStorage.length;
         	var ItemId = "Pro" + (n+1);
            localStorage.setItem(ItemId, JSON.stringify(Product));  

 }