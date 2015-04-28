// Canvas inspired by http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
var canvasWidth = 120;
var canvasHeight = 120;
var canvasDiv = document.getElementById('canvasDiv');
var canvasColor = "rgba(255, 255, 255, 1)";
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvas.onselectstart = function () { return false; } // ie
canvas.onmousedown = function () { return false; } // mozilla
canvasDiv.appendChild(canvas);

if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");
context.fillStyle = canvasColor;
context.fillRect(0, 0, canvasWidth, canvasHeight);

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}


function redraw(){
  canvas.width = canvas.width; // Clears the canvas
  context.fillStyle = canvasColor; // Work around for Chrome
  context.fillRect(0, 0, canvasWidth, canvasHeight); // Fill in the canvas with white
  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 2;
			
  for(var i=0; i < clickX.length; i++)
  {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}

function clearCanvas()
{
	clickX = new Array();
	clickY = new Array();
	clickDrag = new Array();
	canvas.width = canvas.width; // clears the canvas 
	context.fillStyle = canvasColor; // Work around for Chrome
	context.fillRect(0, 0, canvasWidth, canvasHeight); // Fill in the canvas with white
	document.getElementById("output").innerHTML = "Guess: ";
	downsampleDrawAll();
	document.getElementById("canvasUser").width = document.getElementById("canvasUser").width;
	for (var digit = 0; digit <= 9; digit++) {
		document.getElementById("text" + digit).innerHTML = "-";
	}
	document.getElementById("downsampleUser").style.left = '2px';
}

// Created using R script in ../../Other
var images = [[0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,1,1,1,1,0,0,0,0,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1]
];

function pixelArray() {	
	// Table is the downsampled array that we want to correct on... 
	var table = downsample();
	
	var guess;
	
	if (table != undefined) {	
		var total = [0,0,0,0,0,0,0,0,0,0];
		for (var j = 0; j <10; j++) {
			for (var i = 0; i < (12 * 16); i++) {
				total[j] += Math.pow((images[j][i]-table[i]),2); // Euclidean distance
			}
		}
		guess = total.indexOf(Math.min.apply(Math, total));
		document.getElementById("output").innerHTML = "Guess: " + guess;
		downsampleDraw(images[guess], guess, "white", "red");
	
		for (var digit = 0; digit <= 9; digit++) {
			document.getElementById("text" + digit).innerHTML = ((192 - total[digit])/192*100).toFixed(0) + "%";
		}
		
		var canvasUser = document.getElementById("downsampleUser")
		canvasUser.style.left = (2 + (guess * 66)) + 'px'
		
	} else {
		document.getElementById("output").innerHTML = "Canvas blank!";
	}
		
}

function isLineEmpty(canvasContext, num, type) {
	//var c = document.getElementById("canvas").getContext('2d');
	if (type == "row") {
		var p = canvasContext.getImageData(0, num, canvasWidth, 1).data;
	} else {
		var p = canvasContext.getImageData(num, 0, 1, canvasHeight).data;
	}
	
	for (var i = 0; i < p.length; i++) {
        if (p[i] < 255) {
            return false;
        }
    }
	return true;
}

function downsample() {
	// Downsampling inspired by http://www.codeproject.com/Articles/477689/JavaScript-Machine-Learning-and-Neural-Networks-wi
	var c = document.getElementById("canvas").getContext('2d');
	var top = 0;
	var bottom = canvasHeight-1;
	var left = 0;
	var right = canvasWidth-1;
	
	var downsampleWidth = 12;
	var downsampleHeight = 16;
	
	if (Math.min.apply(Math, c.getImageData(0, 0, canvasWidth, canvasHeight).data) < 255) {
		//if not blank
	
		while(isLineEmpty(c, top, "row")) {
			top++;
		}
		while(isLineEmpty(c, right, "column")) {
			right--;
		}
		while(isLineEmpty(c, bottom, "row")) {
			bottom--;
		}
		while(isLineEmpty(c, left, "column")) {
			left++;
		}
	
	
	var cellWidth = (right - left) / downsampleWidth;
    var cellHeight = (bottom - top) / downsampleHeight;
    var result = new Array();
    var count = 0;
	
		//edit below
		for (i = 0; i < downsampleHeight; i++) {
			for (j = 0; j < downsampleWidth; j++) {
                var x = (cellWidth * j) + left;
                var y = (cellHeight * i) + top;
                var p = c.getImageData(x, y, cellWidth, cellHeight).data;

                pixelFlag = false;
                
                for (k = 0; k < p.length; k++) {
                    if (p[k] < 255) {
                        pixelFlag = true;
                        break;
                    }
                }

                if (pixelFlag) {
                    result[count++] = 1;
                } else {
                    result[count++] = 0;
                }
			}
		}
	
	} //end if not blank
	
	//draw user's downsampled digit
	if (result != undefined) {
		downsampleDraw(result, "User", "white", "black");
	}
	return result;
}

function downsampleDrawAll() {
	// draw out quickly on canvas
	for (var digit = 0; digit <= 9; digit++) {
		downsampleDraw(images[digit], digit, "white", "black");
	}
}

function downsampleDraw(digitMap, id, bgcolor, fgcolor) {
	var context = document.getElementById("canvas" + id).getContext('2d');
	
	var count = 0;
	for (var i = 1; i <= 16; i++) {
		for (var j = 1; j <= 12; j++) {
			if (digitMap[count] == 1) {
				context.fillStyle = fgcolor;
			} else {
				context.fillStyle = bgcolor;
			}
			context.fillRect((j-1)*5, (i-1)*5, 5, 5);
			
			count++;
		}
	}
}

window.onload = downsampleDrawAll;