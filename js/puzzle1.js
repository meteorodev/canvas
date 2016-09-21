/* inicializar la variables a utilizar
 */

var canvas;
var stage;

var picture;
var pieces = [];
var canvasWidth;
var canvasHeight;
var pieceWidth;
var pieceHeight;
var currentPiece;
var currentDropPiece;
var temX;
var temY;
var mouse;
var center = [];
var screen;
var factor;
var paths = [];

/**function inicializadora */
function init() {
    createPaths();
    factor = 0.55;
    //init canvas wiht initioals dimentions  
    canvasHeight = 600;
    loadImage();
    loadPieces(paths, function () {
        console.log("size of pieces " + pieces.length);
        print();
    });
}

function createPaths() {
    for (i = 0; i < 8; i++) {
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

}

/*print pieces into the canvas*/
function print() {
    //compute the ceter of each image
    for (i = 0; i < pieces.length; i++) {
        center[i] = {cx: (pieces[i].width / 2), cy: (pieces[i].height / 2)};
        console.log("imge added {" + pieces[i].width+" : "+pieces[i].height+"} image at "+pieces[i].src );
        console.log("center pos {"+center[i].cx+" : "+ center[i].cy+"}");
        stage.drawImage(pieces[i], Math.random()*pieces[i].width, Math.random()*pieces[i].height, pieces[i].width*factor, pieces[i].height*factor);
    }
    console.log(center.length);
}

/*load the main imagen and change the width and height */
function loadImage() {
    picture = document.getElementById("art");
    picture.src = "img/pic1/pic1.jpg";
    console.log("image's dimention {" + picture.width + " : " + picture.height + "}");
    reziseImg(picture);
    picture.width = canvasWidth - 300;
    picture.height = canvasHeight - 300;
    console.log("image's dimention change {" + picture.width + " : " + picture.height + "}");
    getCanvan();
}

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
    canvas = document.getElementById('lienso');
    stage = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid black";
    //inicialite the mouse varible
    mouse = {x: 0, y: 0};
    //add mousemove event into the document
    //document.onmousemove =overCanvas;
    document.onmouseup = mousePosition;
    document.onmousedown = mousePosition;
}

//get the mouse position base on canvas
function mousePosition(e) {

    if (e.layerX || e.layerX === 0) {
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
        console.log("with e.layer by x: " + mouse.x + " by y: " + e.layerY);
    } else if (e.offsetX || e.offsetX === 0) {
        mouse.x = e.offsetX - canvas.offsetLeft;
        mouse.y = e.offsetY - canvas.offsetTop;
        console.log("with e.offset by x: " + mouse.x + " by y: " + e.layerY);
    }
    //stage.drawImage(img2, mouse.x, mouse.y, 80, 236);
    return mouse;
}

/*compute the images centers*/

function centerAdd(imgT, pos) {
    center[pos] = {cx: (imgT.width / 2), cy: (imgT.height / 2)};
    console.log("imge added " + imgT.width);
    pieces[pos] = imgT;
}
