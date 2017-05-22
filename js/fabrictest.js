/* 
 * DESCRIPCIÓN
 * 
 * ____________________________________________________________________________
 * Autor:   Darwin Rosero Vaca <darwin11rv@gmail.com>
 * Fecha:   17/05/2017
 * Versión: 1.0
 * Descrip: Creacion
 * ____________________________________________________________________________
 * Copyright © 2017 DRVCORP All rights
 * and open the template in the editor.
 */
var np;
var pieces = [];
var piecesPaint = [];// pieces to be add
function init() {
    // create a wrapper around native canvas element (with id="c")
    var can = new fabric.Canvas('canvaspic');
    canvasHeight = can.height;
    console.log('Cavan heigth ' + canvasHeight);
    canvasWidth = can.width;
    var osp = document.getElementById("art");
    console.log("natural w/h " + osp.naturalWidth + " / " + osp.naturalHeight);
    //factor = 0.32;
    factor = osp.naturalHeight / canvasHeight;
    console.log("factor  " + factor);
    var np = document.getElementById("canvasContainer1").getElementsByTagName("img").length;
    console.log("find img " + np);
    loadPieces();
// create a rectangle object
    for (i = 1; i <= np; i++) {        
        fabric.Image.fromURL('./img/pic1/'+i+'.png', function (oImg) {
            // scale image down, and flip it, before adding it onto canvas
            oImg.scale(factor).setFlipX(false);
            can.add(oImg);
        });
    }

    //getCanvan();
    
}

function loadPieces() {
    
    for (i = 1; i <= np; i++) {
        var imgT = new Image();
        var imgT = document.getElementById("piece" + i);
        imgT.width = imgT.naturalWidth;
        imgT.height = imgT.naturalHeight;
        pieces.push(imgT);
        piecesPaint.push(0);
        //var imgT = new Image
    }
    //print();
    //rezise the image selector
    
}


