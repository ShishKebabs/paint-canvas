var canvas = document.getElementById('art-canvas');
var context = canvas.getContext('2d');


function canvasDraw() { //https://phpacademy.org/topics/html5-canvas-drawing-app/30262 Drawing tool was guided by this article.
	clearListeners();

	canvas.addEventListener('mousedown', launchDrawing);
    canvas.addEventListener('mousemove', Drawing);
    canvas.addEventListener('mouseup', stopDrawing);
	context.lineWidth = radius*2;


}

	var radius = 10;
	var dragging = false;



	var Drawing = function(e){
        if(dragging){ //draw a path between x and y from user input on mouse drag 
		    context.lineTo(e.offsetX, e.offsetY);
            context.strokeStyle = 'black';
            context.stroke();			
            context.beginPath();
			context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
            context.fillStyle = 'black';
			context.fill();
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);

        }
    }
	
	// put a point on click and set the dragging to trigger the function above.
    var launchDrawing = function(e){
        dragging = true;
        Drawing(e);
    }
	// context.beginPath will stop it creating a line between another action clicked on canvas
    var stopDrawing = function(){
        dragging = false;
        context.beginPath();	
    }
	
	var setRadius = function(newRadius){
        if(newRadius<minRadius) 
            newRadius = minRadius;
        
        else if(newRadius>maxRadius) 
            newRadius = maxRadius;
            radius = newRadius;
            context.lineWidth = radius*2;
            radSpan.innerHTML = radius;
    }
	
    var minRadius = 2,
        maxRadius = 30,
        increment = 2,
		// get the elements we want to take input from
        radSpan = document.getElementById('radiusValue'),
        decRad = document.getElementById('decRadius'),
        incRad = document.getElementById('incRadius');
	
		// on click decrease/increase radius by the increment 
	decRadius.addEventListener('click', function(){
        setRadius(radius-increment);
    });

    incRadius.addEventListener('click', function(){
        setRadius(radius+increment);

    });	
	
	
	function canvasColour () {
	
	var Colour = document.getElementById("colorCanvas").value;	

	context.fillStyle = Colour;
	context.fillRect(0,0,800,500);
	}
	
function addTitle(){
    clearListeners();
    canvas.addEventListener('mousedown', getPositionText);
}
    var getPositionText = function(text){
    var title = document.getElementById("titleValue").value;
	var fontSize = document.getElementById("fontSize").value;
	var fontFamily = document.getElementById("fontFamily").value;
	var colorText = document.getElementById("colorText").value;

        //Add text to canvas:
		
		var width= canvas.clientWidth;
        context.font = fontSize + " "+fontFamily;
		context.fillStyle = colorText;
        context.fillText(title,text.offsetX, text.offsetY);
        clearListeners();

    }
    	
function circle(){
    clearListeners();
    canvas.addEventListener('mousedown', getPositionCircle);

}

var getPositionCircle = function(circle){
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(circle.offsetX, circle.offsetY,20,0,2*Math.PI);
		context.fillStyle= 'white';
        context.fill();
		context.strokeStyle = 'black';
        context.stroke();
        context.moveTo(circle.offsetX, circle.offsetY);
		context.beginPath();
        clearListeners();
 }

function rectangle (){
    clearListeners();
	canvas.addEventListener('mousedown', getPositionRectangle);
}

var getPositionRectangle = function(rectangle){
        context.beginPath();
        context.rect(rectangle.offsetX, rectangle.offsetY, 200, 100);
        context.lineWidth = 3;
		context.fillStyle= 'white';
        context.fill();
        context.strokeStyle = 'black';
        context.stroke();
        context.moveTo(rectangle.offsetX, rectangle.offsetY);
		context.beginPath();
        clearListeners();
}

function speechBubble() {
    clearListeners();
    canvas.addEventListener('mousedown', getPositionSpeechBubble);
}

var getPositionSpeechBubble = function(speechBubble){
      // draw shape
        context.translate(speechBubble.offsetX, speechBubble.offsetY);
        context.scale(-1,1);
        context.beginPath();
        context.moveTo(0,0);
        context.bezierCurveTo(0,-360,-500,-140,-120,-60);

        // finish
        context.closePath();
        context.lineWidth = 5;
        context.fillStyle= 'white';
        context.fill();
        context.strokeStyle = 'black';
        context.stroke();
        context.scale(-1,1);
        context.translate(-speechBubble.offsetX, -speechBubble.offsetY);
        context.beginPath();
        clearListeners();
}

function clearListeners() { // stop a function when another is being used
    canvas.removeEventListener('mousedown', getPositionCircle);
    canvas.removeEventListener('mousedown', getPositionRectangle);
	canvas.removeEventListener('mousedown', launchDrawing);
    canvas.removeEventListener('mousemove', Drawing);
    canvas.removeEventListener('mouseup', stopDrawing);
    canvas.removeEventListener('mousedown', getPositionText);
    canvas.removeEventListener('mousedown', getPositionSpeechBubble);
}

var clear = document.getElementById("clear");
	clear.addEventListener('click', clearImage);
	function clearImage (){
		context.clearRect(0, 0, context.canvas.width, 
context.canvas.height);
}
    
var saveButton = document.getElementById("save")
saveButton.addEventListener('click', saveImage);
function saveImage(){
	var data = canvas.toDataURL();
    window.open(data, '_blank', 'location=0, menubar=0');

}

function imageUrlFunc() {
		let image = new Image();
		let source = document.getElementById("url").value;
		image.src = source;
		image.onload = function() {
        context.drawImage(image,0,0,800,500);
      }
}
	  	  
function imageSelectorFunc (option) {
    var img=document.getElementById(option);
    context.drawImage(img,0,0,800,500);
}
