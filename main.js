
/**
 * Slider ---------------------------------------------------------------------------------------
 */

const images = ["photos/1.png", "photos/2.png", "photos/3.png"];

const sliderDom = document.getElementById("slide");

let slide = new Slider(images, sliderDom);

/**
 * Canvas-------------------------------------------------------------------------------------------------------
 */

const canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");

let radius = 4;

let dessin = new Draw(canvas, ctx, radius);


/**
 * compteur--------------------------------------------------------------------------------------
 */

const second = 0 +"0";

const minute = 20;

let compteur = new Timer(second, minute);


/**
 * Map-------------------------------------------------------------------------------------------
 */

const mymap = L.map('mapid').setView([45.75, 4.85], 13);//setview([lon, lat], niveau de zoom)

const tiles = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

let myIconFin =  L.divIcon({className: 'my-div-icon-fin'});

let myIcon = L.divIcon({className: 'my-div-icon'});

let myIconErreur = L.divIcon({className: 'my-div-icon-error'});

let map = new Map();

tiles.addTo(mymap);

map.confirmButton(dessin, compteur);

