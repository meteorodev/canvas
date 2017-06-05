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
var can;
var factor;
var np;
var imgSelected;
var canvasHeight;
var canvasWidth;
function init() {
    //testfabric();
    getCanvas();

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
function addrempiece(e) {
    var el = document.getElementById(e.id);
    var imgadd;
    var action = e.id.charAt(0);
    var nid = e.id.substr(1);
    var objs;
    var idc = "piece" + nid;
    var posc = 0;
    imgadd = document.getElementById(idc);
    if (np===10){
        imgadd.height = imgadd.height * 0.72;
        imgadd.width = imgadd.width * 0.72;
    }
    console.log(imgadd.height);
    if (action === 'a') {
        e.id = "e" + nid;
        el.src = "img/icons/e.png";
        ttop = Math.round(Math.random() * (canvasWidth / 2 - 1));
        tleft = Math.round(Math.random() * (canvasHeight / 2 - 1));
        console.log(ttop + " -- " + tleft);
        imgSelected = new fabric.Image(imgadd, {
            left: ttop,
            top: tleft,
            angle: 00,
            id: idc
                    //opacity: 0.85
        });
        can.add(imgSelected);
        objs = can.getObjects().map(function (o) {
            return o.set('active', true);
        });
        for (var i = 0; i < objs.length; i++) {
            can.setActiveObject(can.item(i));
        }
    } else {
        objs = can.getObjects().map(function (o) {
            return o.set('active', true);
        });
        for (var i = 0; i < objs.length; i++) {
            if (idc === objs[i].id) {
                can.setActiveObject(can.item(i));
                console.log("pos bus " + i + " id " + can.item(i).id);
            }
        }
        can.remove(can.getActiveObject());
        e.id = "a" + nid;
        el.src = "img/icons/a.png";
    }
    //console.log("active " + can.getActiveObject(can.item(0)).id);

}

// cahnge size from a e action.
function overMe(){
    
}

