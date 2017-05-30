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
        tope = Math.random() * canvasWidth;
        console.log(tope);
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
        console.log("****************************************+");
        console.log("item  " + can.item(0));
        //can.setActiveObject(can.item(1));
        console.log("active " + can.getActiveObject(can.item(0)));
        //can.remove(imgSelected);
        var idc="piece"+nid;
        //try to select by id
        can.forEachObject(function (obj) {
            if (obj.id && obj.id === idc) {
                obj.set('active', true);
            }
        });
        console.log("active " + can.getActiveObject(can.item(0)));
        console.log("*****************************************");
    }
    var objs = can.getObjects().map(function (o) {
        return o.set('active', true);
    });

    console.log("numero de objetos " + objs.length + " pieces " + piecesPaint.length);
    for (var i = 0; i < piecesPaint.length; i++) {
        console.log(piecesPaint[i].oCoords.bl);
        console.log(objs[i]);
    }

}
// select all objects
function deleteObjects() {
    var activeObject = can.getActiveObject();
    if (activeObject) {
        if (confirm('Are you sure active?')) {
            can.remove(activeObject);
        }
    }
}



