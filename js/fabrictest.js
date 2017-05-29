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
var can;
var factor;
var np;
var imgSelected;
var canvasHeight;
var canvasWidth;
function init() {
    //testfabric();
    getCanvas();
    loadPieces();

}
function getCanvas() {
    // create a wrapper around native canvas element (with id="c")
    can = new fabric.Canvas('canvaspic');
    canvasHeight = can.height;
    console.log('Cavan heigth ' + canvasHeight);
    canvasWidth = can.width;
    var osp = document.getElementById("art");
    console.log("natural w/h " + osp.naturalWidth + " / " + osp.naturalHeight);
    factor = osp.naturalHeight / canvasHeight;
    console.log("factor  " + factor);
    np = document.getElementById("canvasContainer1").getElementsByTagName("img").length;
    console.log("find img " + np);
}

function loadPieces() {

    for (i = 1; i <= np; i++) {
        var imgT = new Image();
        var imgT = document.getElementById("piece" + i);
        imgT.width = imgT.naturalWidth;
        imgT.height = imgT.naturalHeight;
        pieces.push(imgT);
        //var imgT = new Image
    }
    //print();
    //rezise the image selector

}

function addrempiece(e) {
    var el = document.getElementById(e.id);
    var imgadd;
    var action = e.id.charAt(0);
    var nid = e.id.charAt(1);
    imgadd = document.getElementById("piece" + nid);
    if (action === 'a') {
        e.id = "e" + nid;
        el.src = "img/icons/e.png"; 
        tope = Math.random()*canvasWidth;
        imgSelected = new fabric.Image(imgadd, {
            left: 100,
            top: 200,
            angle: 00//,
            //opacity: 0.85
        });
        piecesPaint.push(imgSelected);
        can.add(imgSelected);
    } else {
        e.id = "a" + nid;
        el.src = "img/icons/a.png";
        console.log(can.item(nid));
        can.remove(imgSelected);
    }
    console.log("numero de objetos "+can.isEmpty()+" pieces "+piecesPaint.length);
    for (var i = 0; i < piecesPaint.length; i++) {
        console.log(piecesPaint[i].oCoords.bl);
    }
    //can.renderAll.bind(can);
    

}



