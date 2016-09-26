/* 
 * DESCRIPCIÓN
 * 
 * ____________________________________________________________________________
 * Autor:   Darwin Rosero Vaca <darwin11rv@gmail.com>
 * Fecha:   26/09/2016
 * Versión: 1.0
 * Descrip: Creacion
 * ____________________________________________________________________________
 * Copyright © 2016 INAMHI  inamhi.gob.ec All rights
 * and open the template in the editor.
 */


var canvasP;
var stageP;
var imgCanvas, imgFill;
var width, height;
var mouse;
var drag = false;

function init() {
    //initialeze height size for computing width base on it
    height = 600;
    width = 400;
    loadImage();
}


/*initialize the canvas picture an the canvas courtain*/
function getCanvas() {
    mouse = {x: 0, y: 0};
    canvasP = document.getElementById("imageback");
    stageP = canvasP.getContext('2d');
    canvasP.width = width;
    canvasP.height = height;
    canvasP.style.border = "1px solid black";
    
    canvasP.onmousedown = mousedown;
    canvasP.onmouseup = mouseup;
    canvasP.onmousemove = mousePosition;
    /*create a image that will be erase*/
    var fontimage = new Image();
    fontimage.src = "img/show/font.jpg";
    fontimage.onload = function () {
        stageP.drawImage(fontimage, 0, 0, width, height);

    };
    console.log("creating canvas");

}
function loadImage() {
    var picture = new Image();
    picture.src = "img/show/most.png";
    // Make sure the image is loaded first otherwise nothing will draw.
    picture.onload = function () {
        resizeImage(picture);
        getCanvas();
    };

}
function resizeImage(temImg) {
    if (temImg.height >= height) {
        var dif = temImg.height - height;
        height = temImg.height - dif;
        width = temImg.width - dif;
        console.log("canvan's dimention {" + width + " : " + height + "}");
    }

}
function erasefont(){
    stageP.clearRect(mouse.x,mouse.y,30,30);
}
function mouseup() {
    drag=false;
    canvasP.style.cursor="default";
}
function mousedown() {
    drag=true;
    canvasP.style.cursor="move";
}
//get the mouse position 
function mousePosition(e) {
    dragable = 1;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    //console.log("enable drag");
    if (drag) {
        console.log( mouse.x+" : " + mouse.y);
        erasefont();
    }
    return mouse;
}
