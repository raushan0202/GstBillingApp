function makeEditable(name,code,price,gst){

     
     showModelForRatings(name,code,price,gst);
     document.getElementById('name').value = name;
     document.getElementById('code').value = code;
     document.getElementById('price').value = price;
     document.getElementById('gst').value = gst;
     


}

function showModelForRatings(name,code,price,gst){


    // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementsByClassName("editbtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on the button, open the modal 

 modal.style.display = "block";



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

}

function update(){
    
   $.ajax({
		url : '/billing'  +'?_method=PUT' ,
		data: {"code": ($("#code").val()),
	   			"name": ($("#name").val()),
	   			"price": ($("#price").val()),
	   			"gst": ($("#gst").val())},
		type: 'POST',
		success:function(result){
			//console.log(result);
			//$("#productContainer").html(result);
			window.location.reload();

		}
	});
}