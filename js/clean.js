/* 
 * DESCRIPCIÓN
 * 
 * ____________________________________________________________________________
 * Autor:   Darwin Rosero Vaca <darwin11rv@gmail.com>
 * Fecha:   26/09/2016
 * Versión: 1.0
 * Descrip: Creacion
 * ____________________________________________________________________________
 * Copyright © 2016 DRVCORP.sa All rights
 
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
    height = 459;
    width = 817;
    loadImage();
}


/*initialize the canvas picture an the canvas*/
function getCanvas() {
    mouse = {x: 0, y: 0};
    canvasP = document.getElementById("imageback");
    stageP = canvasP.getContext('2d');
    canvasP.width = width;
    canvasP.height = height;
    stageP.clearRect(0, 0, canvasP.width, canvasP.height);
    canvasP.style.border = "1px solid black";

    canvasP.onmousedown = mousedown;
    canvasP.onmouseup = mouseup;
    canvasP.onmousemove = mousePosition;
    var my_gradient = stageP.createLinearGradient(0, 0, 10, height*2);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "#3c3c3c");
    stageP.fillStyle = my_gradient;
    stageP.fillRect(0, 0, width, height);
    console.log("creating canvas");

}
function loadImage() {
    var picture = new Image();
    picture = document.getElementById("picfont");
    // Make sure the image is loaded first otherwise nothing will draw.
    //picture.onload = function () {
        //resizeImage(picture);
        getCanvas();
    //};

}
function resizeImage(temImg) {
    if (temImg.height >= height) {
        var dif = temImg.height - height;
        height = temImg.height - dif;
        width = temImg.width - dif;
        console.log("canvan's dimention {" + width + " : " + height + "}");
    }

}
function erasefont() {
    //stageP.clearRect(mouse.x, mouse.y, 30, 30);
    //draw an arc (in this case, a circle)
    stageP.globalCompositeOperation = 'destination-out';
    stageP.arc(mouse.x, mouse.y, 24, 0, Math.PI * 2);
    stageP.closePath();
    stageP.fill();
}
function mouseup() {
    drag = false;
    canvasP.style.cursor = "default";
}
function mousedown() {
    drag = true;
    canvasP.style.cursor = "move";
}
//get the mouse position 
function mousePosition(e) {
    dragable = 1;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    //console.log("enable drag");
    if (drag) {
        //console.log(mouse.x + " : " + mouse.y);
        erasefont();
    }
    return mouse;
}
