
let roiEditor__input = document.getElementsByClassName('roiEditor__input')[0]
let roiEditor__img = document.getElementsByClassName('roiEditor__img')[0]
let container__right = document.getElementsByClassName("container__right")[0]
var canvasImage = document.getElementsByClassName('roiEditor__canvasImage')[0]
var ctxImage = canvasImage.getContext('2d')
var canvasDraw = document.getElementsByClassName('roiEditor__canvasDraw')[0]
var ctxDraw = canvasDraw.getContext('2d', {willReadFrequently: true})
var canvasBackground = document.getElementsByClassName('roiEditor__canvasBackground')[0]
var clearButton = document.getElementsByClassName('roiEditor__clearButton')[0]
var roiEditor__positions = document.getElementsByClassName('roiEditor__positions')[0]
var ctxBackground = canvasBackground.getContext('2d')
let roiEditor__save = document.getElementsByClassName('roiEditor__save')[0]
var img = undefined; 
var canvasx = 0; 
var canvasy =  0;
var last_mousex = 0; 
var last_mousey = 0;
var mousex = 0; 
var mousey = 0;
var mousedown = false;
var scrollTop = 0
var imHeight = 0
var imWidth = 0


console.log("script file is mounted !")

roiEditor__input.addEventListener("input", (event) => {

    event.preventDefault() 

    img = event.target.files[0]

    canvasImage.renderImage(img);

})


HTMLCanvasElement.prototype.renderImage = function(blob){
  
  
  var image = new Image();

  
  image.onload = function(){

    imHeight =  image.height
    imWidth =  image.width

    canvasImage.width = image.width;
    canvasImage.height = image.height;
    canvasDraw.width = image.width;
    canvasDraw.height = image.height;
    canvasBackground.width = image.width;
    canvasBackground.height = image.height; 
    ctxBackground.drawImage(image,0,0)
    ctxImage.drawImage(image, 0, 0)
    


  }

  image.src = URL.createObjectURL(blob);

  
};



//Mousedown
canvasDraw.addEventListener('mousedown', function(e) {

    last_mousex = parseInt(e.clientX-canvasx);
	last_mousey = parseInt(e.clientY-canvasy + window.scrollY);

    mousedown = true;
});

//Mouseup
canvasDraw.addEventListener('mouseup', function(e) {

    mousedown = false;
});

//Mousemove
canvasDraw.addEventListener('mousemove', function(e) {

   
 
    if(mousedown && img) {


        canvasx = container__right.offsetLeft + canvasDraw.offsetLeft;
        canvasy =  container__right.offsetTop + canvasDraw.offsetTop;
    
        mousex = parseInt(e.clientX-canvasx);
        mousey = parseInt(e.clientY-canvasy + window.scrollY);
    
        rect = canvasDraw.getBoundingClientRect()
        let ratioHeight = imHeight/rect.height
        let ratioWidth = imWidth/rect.width

        ctxDraw.clearRect(0,0,canvasDraw.width,canvasDraw.height); //clear canvas
        ctxDraw.beginPath();
        var width = mousex-last_mousex;
        var height = mousey-last_mousey;
        ctxDraw.rect(last_mousex * ratioWidth,last_mousey  * ratioHeight,width * ratioWidth,height  * ratioHeight);
        ctxDraw.strokeStyle = 'red';
        ctxDraw.lineWidth = 2 * Math.max(ratioHeight, ratioWidth);
        ctxDraw.stroke();
        roiEditor__positions.querySelector("#x_top").textContent = `x-top : ${parseInt(Math.max(mousex  * ratioHeight,last_mousex  * ratioHeight))}`
        roiEditor__positions.querySelector("#y_top").textContent = `y-top : ${parseInt(Math.max(mousey * ratioWidth,last_mousey * ratioWidth))}`
        roiEditor__positions.querySelector("#x_low").textContent = `x-low : ${parseInt(Math.max(Math.min(mousex  * ratioHeight,last_mousex  * ratioHeight), 0))}`
        roiEditor__positions.querySelector("#y_low").textContent = `y-low : ${parseInt(Math.max(Math.min(mousey * ratioWidth,last_mousey * ratioWidth), 0))}`
    }


});

clearButton.addEventListener("click", function(e) {
    e.preventDefault()
    ctxDraw.clearRect(0,0,canvasDraw.width,canvasDraw.height)
    roiEditor__positions.querySelector("#x_top").textContent = `x-top : `
    roiEditor__positions.querySelector("#y_top").textContent = `y-top : `
    roiEditor__positions.querySelector("#x_low").textContent = `x-low : `
    roiEditor__positions.querySelector("#y_low").textContent = `y-low : `

})


roiEditor__save.addEventListener('click', function(e) {

    e.preventDefault()
    var canvasContents = ctxDraw.getImageData(0,0,canvasDraw.width, canvasDraw.height);

    if(img && canvasContents.data.reduce((a, b) => a + b, 0) !== 0){


        rect = canvasDraw.getBoundingClientRect()
        let ratioHeight = imHeight/rect.height
        let ratioWidth = imWidth/rect.width
        var width = mousex-last_mousex;
        var height = mousey-last_mousey;

        imageCropped = ctxBackground.getImageData(last_mousex * ratioWidth,last_mousey  * ratioHeight,width * ratioWidth,height  * ratioHeight);
         // create destiantion canvas

        var canvasDownload = document.createElement("canvas");
        var ctxDownload = canvasDownload.getContext("2d");
       
        canvasDownload.width = imageCropped.width;
        canvasDownload.height = imageCropped.height;
        ctxDownload.putImageData(imageCropped, 0, 0);
        const link = document.createElement('a');
        link.download = `crop.png`;
        link.href = canvasDownload.toDataURL();
        link.click();
        link.delete;

    }

  });