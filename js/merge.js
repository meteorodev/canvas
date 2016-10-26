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
var canvas;
var stage;
var picture;
var pieces = [];
var canvasWidth;
var canvasHeight;
var dragable = 0;
var mouse;
var currentpiece;
//contains the position for each piece star position and end position 
var piecePosition = [];
var factor;
var difx, dify,nImages;

/**function inicializadora */
function init() {
    var can= document.getElementById("canvaspic");
    canvasHeight=can.height;
    canvasWidth=can.width; 
    factor = 0.55;
    //init canvas wiht initioals dimentions  
    loadImage();
    loadPieces();
    console.log("imagenes en lieces "+pieces.length);
    for(i=0;i<pieces.length;i++){
        console.log(" pieces contiene "+pieces[i].getAttribute("id"));
    }
}


function loadPieces() {
    var np= document.getElementById("canvasContainer1").getElementsByTagName("div").length;
    console.log("numero de divs encontrados "+np);
    for(i=1;i<= np;i++ ){
        console.log(" imagen leida  "+i);
        pieces.push(document.getElementById("piece"+i));
    }
    print();
}

/*print pieces into the canvas*/
function print() {
    //compute the ceter of each image
    var prx, pry, wi, he;
    for (i = 0; i < pieces.length; i++) {
        prx = Math.floor(Math.random() * (pieces[i].width / 2));
        pry = Math.floor(Math.random() * (pieces[i].height / 2));
        wi = Math.floor(pieces[i].width * factor);
        he = Math.floor(pieces[i].height * factor);
        piecePosition[i] = {opx: prx, opy: pry, cx: (prx + (wi / 2)), cy: (pry + (he / 2)), wi: wi, he: he};
        stage.drawImage(pieces[i], prx, pry, wi, he);
    }
    currentpiece = pieces.length - 1;
}


/*load the main imagen and change the width and height */
function loadImage() {
    //console.log("image's dimention change {" + picture.width + " : " + picture.height + "}");
    getCanvan();
}

/*just by development status*/
function printCoor(num, rx, ry, cx, cy, wi, he) {
    stage.strokeStyle = "#0000FF";
    stage.fillStyle = "#FF0000";
    stage.strokeRect(rx, ry, wi, he);
    //stage.fillText((rx + wi) + " " + (ry + he), (rx + wi), (ry + he));
    //stage.fillText(cx + " " + cy, cx, cy);
    //stage.fillText(rx + " " + ry, rx, ry);
    //stage.strokeStyle = "#00FF00";
    //stage.beginPath();
    //stage.lineWidth = 1;
    //stage.lineCap = "round";
    //stage.moveTo(cx, 0);
    //stage.lineTo(cx, 600);
    //stage.moveTo(0, cy);
    //stage.lineTo(625, cy);
    //stage.stroke();
}

//initialice the canvas
function getCanvan(dif) {
    canvas = document.getElementById('canvaspic');
    stage = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid black";
    //inicialite the mouse varible
    mouse = {x: 0, y: 0};
    //add mousemove event into the document
    //document.onmousemove =overCanvas;
    canvas.onmousedown = mousePosition;
    canvas.onmousemove = pintDrag;
    canvas.addEventListener("mouseup", function () {
        //console.log("Drag disable");
        dragable = 0;
    }, false);
    canvas.ondblclick = repaint;
}

//get the mouse position base on canvas
function mousePosition(e) {
    dragable = 1;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    //console.log("e.layer by x: " + e.layerX + " : " + canvas.offsetLeft + " : " + e.offsetX);
    //console.log("e.layer by x: " + e.layerY + " : " + canvas.offsetTop + " : " + e.offsetY);
    checkPieceClicked();
    console.log("enable drag");
    //stage.drawImage(img2, mouse.x, mouse.y, 80, 236);
    return mouse;
}

function pintDrag(e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    if (dragable === 1 && checkPieceClicked) {
        //console.log("painted drag positions");
        console.log("mouse [" + mouse.x + ":" + mouse.y + "]");
        pieceMove();
    }
}

function checkPieceClicked() {    
    //for (i = 0; i < pieces.length; i++) {
    piece = pieces[currentpiece];
    printCoor(0, piecePosition[currentpiece].opx, piecePosition[currentpiece].opy, piecePosition[currentpiece].cx,
    piecePosition[currentpiece].cy, piecePosition[currentpiece].wi, piecePosition[currentpiece].he);
    try {
        if (mouse.x > piecePosition[currentpiece].opx && mouse.x < (piecePosition[currentpiece].opx + piecePosition[currentpiece].wi) &&
                mouse.y > piecePosition[currentpiece].opy && mouse.y < (piecePosition[currentpiece].opy + piecePosition[currentpiece].he)) {
            console.log(i + " pieces clicked !! " + piece.src);            
            difx = mouse.x - piecePosition[currentpiece].opx;
            dify = mouse.y - piecePosition[currentpiece].opy;
            return true;
        }
    } catch (err) {
    }
    //}
    return false;
}

/*function that repaint the pieces in a new position*/
function repaint() {
    moveTolast();
    stage.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < pieces.length; i++) {
        stage.drawImage(pieces[i], piecePosition[i].opx, piecePosition[i].opy, piecePosition[i].wi, piecePosition[i].he);
    }
}

/*Function that reorder the position that the images is painted*/

function moveTolast() {
    var newPosition = [];
    var newPaths = [];
    var newpiecesPositions = [];
    newPosition[0] = pieces[currentpiece];
    newPaths[0] = paths[currentpiece];
    newpiecesPositions[0] = piecePosition[currentpiece];
    for (var i = 0; i < currentpiece; i++) {
        newPosition[i + 1] = pieces[i];
        newPaths[i + 1] = paths[i];
        newpiecesPositions[i + 1] = piecePosition[i];
    }
    pieces = newPosition;
    piecePosition = newpiecesPositions;
    paths = newPaths;
}

/*find wich piece was clicked*/

function pieceMove() {
    console.log("painted moves positions");
    piecePosition[currentpiece].opx = mouse.x - difx;
    piecePosition[currentpiece].opy = mouse.y - dify;
    //console.log("opx:opy [" + nx + ":" + ny + "]\n" + "cy:cy   [" + ncx + ":" + ncy + "]");
    stage.clearRect(0, 0, canvasWidth, canvasHeight);
    printCoor(0, piecePosition[currentpiece].opx, piecePosition[currentpiece].opy, piecePosition[currentpiece].cx,
    piecePosition[currentpiece].cy, piecePosition[currentpiece].wi, piecePosition[currentpiece].he);
    for (var i = 0; i < pieces.length; i++) {        
        stage.drawImage(pieces[i], piecePosition[i].opx, piecePosition[i].opy, piecePosition[i].wi, piecePosition[i].he);
        //console.log("new coords "+piecePosition[i].opx + " " + piecePosition[i].opy
        //      + " " + piecePosition[i].wi + " " + piecePosition[i].he);
    }
}
