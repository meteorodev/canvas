/* inicializar la variables a utilizar
 */

var canvas;
var stage;

var picture;
var pieces = [];
var canvasWidth;
var canvasHeight;
var currentPiece;
var currentDropPiece;
var temX;
var temY;
var mouse;
//contains the position for each piece star position and end position 
var piecePosition = [];
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
    console.log("pieces length out foreach " + pieces.length);
    //return pieces;

}

/*print pieces into the canvas*/
function print() {
    //compute the ceter of each image
    var prx, pry, wi, he;
    for (i = 0; i < pieces.length; i++) {
        prx = Math.floor(Math.random() * pieces[i].width);
        pry = Math.floor(Math.random() * pieces[i].height);
        wi = Math.floor(pieces[i].width * factor);
        he = Math.floor(pieces[i].height * factor);

        piecePosition[i] = {opx: prx, opy: pry, cx: (prx + (wi / 2)), cy: (pry + (he / 2)), wi: wi, he: he};
        console.log("imge added {" + wi + " : " + he + "} image in " + pieces[i].src + "\n" +
                "start position  {" + piecePosition[i].opx + " : " + piecePosition[i].opy + "}\n" +
                "final pos  {" + (prx + wi) + " : " + (pry + he) + "}" + "\n" +
                "center pos {" + piecePosition[i].cx + " : " + piecePosition[i].cy + "}\n");
        printCoor(i, prx, pry, piecePosition[i].cx, piecePosition[i].cy, wi, he);
        stage.drawImage(pieces[i], prx, pry, wi, he);
    }
    //console.log(piecePosition.length);
    document.onmouseup = mousePosition;
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

/*just by development status*/
function printCoor(num, rx, ry, cx, cy, wi, he) {
    stage.strokeStyle = "#0000FF";
    stage.fillStyle = "#FF0000";
    stage.strokeRect(rx, ry, wi, he);
    stage.fillText((rx + wi) + " " + (ry + he), (rx + wi), (ry + he));
    stage.fillText(cx + " " + cy, cx, cy);
    stage.fillText(rx + " " + ry, rx, ry);
//    console.log(cx);
    stage.strokeStyle = "#00FF00";
    stage.beginPath();
    stage.lineWidth = 1;
    stage.lineCap = "round";
    stage.moveTo(cx, 0);
    stage.lineTo(cx, 600);
    stage.moveTo(0, cy);
    stage.lineTo(625, cy);
    stage.stroke();
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
    canvas = document.getElementById('lienso');
    stage = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid black";
    //inicialite the mouse varible
    mouse = {x: 0, y: 0};
    //add mousemove event into the document
    //document.onmousemove =overCanvas;

    //document.onmousemove = mousePosition;
}

//get the mouse position base on canvas
function mousePosition(e) {

    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    console.log("e.layer by x: " + e.layerX + " : " + canvas.offsetLeft + " : " + e.offsetX);
    console.log("e.layer by x: " + e.layerY + " : " + canvas.offsetTop + " : " + e.offsetY);
    checkPieceClicked();
    //stage.drawImage(img2, mouse.x, mouse.y, 80, 236);
    return mouse;
}

function checkPieceClicked() {
    var i;
    var piece;
    console.log("pieces length " + pieces.lengt)
    for (i = 0; i < pieces.length; i++) {
        piece = pieces[i];
        console.log("mouse   x: " + mouse.x + " y: " + mouse.y + "\n" +
                "init p  x: " + piecePosition.opx + " y: " + piecePosition.opy + "\n" +
                "final p x: " + (piecePosition.opx + piecePosition.wi) + " y: " + (piecePosition.opy + piecePosition.he));
        if (mouse.x < piecePosition.opx && mouse.x > (piecePosition.opx + piecePosition.wi) &&
                mouse.y < piecePosition.opy && mouse.y > (piecePosition.opy + piecePosition.he)) {
            console.log("pieces clicked !! " + piece.src);
            return piece;
        } else {
            console.log("no pieces was click !! ");
            return null;
        }
    }

}


/*find wich piece was clicked*/

function clickPiece(e) {

}
