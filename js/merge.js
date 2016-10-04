/* inicializar la variables a utilizar
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
var paths = [];
var difx, dify,nImages;

/**function inicializadora */
function init() {
    getpath();
    createPaths();
    factor = 0.55;
    //init canvas wiht initioals dimentions  
    canvasHeight = 600;
    loadImage();
    loadPieces(paths, function () {
        //console.log("size of pieces " + pieces.length);
        print();
    });
}

//create div base on name of images
function getpath(){
    var parent= document.getElementById("art");
    console.log(" de la imagen leida "+parent.alt);
    nImages=parent.alt;
    // get the parent of canvas 
    parent = document.getElementById("canvasContainer");
    //create new divs with the pieces of picture
    for(i = 0;i < nImages;i++){
        
    }
    
}

function createPaths() {
    for (i = 0; i < nImages; i++) {
        paths[i] = "img/pic1/" + (i + 1) + ".png";
    }
    
}

function loadPieces(paths, whenLoaded) {
    /*create imges pieces from picture*/
    paths.forEach(function (path) {
        var imgT = new Image();
        imgT.onload = function () {
            pieces.push(imgT);
            if (pieces.length === paths.length) {
                whenLoaded(pieces);
            }
        };
        setTimeout(function () {
            imgT.src = path;
        }, 1);
    });
    //return pieces;
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
    picture = document.getElementById("art");
    picture.src = "img/pic1/pic1.jpg";
    //console.log("image's dimention {" + picture.width + " : " + picture.height + "}");
    reziseImg(picture);
    picture.width = canvasWidth - 300;
    picture.height = canvasHeight - 300;
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
/*end functions of development status*/

function reziseImg(temImg) {
    if (temImg.height >= canvasHeight) {
        var dif = temImg.height - canvasHeight;
        canvasHeight = temImg.height - dif;
        canvasWidth = temImg.width - dif;
        console.log("canvan's dimention {" + canvasWidth + " : " + canvasHeight + "}");
    }
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