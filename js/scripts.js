/*Estilo del Marcador*/
var MarkerOptions = {
	radius: 5,
	fillColor: "#ff7800",
	color: "#000",
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};



/*####################################*/

// Creación de un mapa de Leaflet
var map = L.map("mapid");
var eitgira = L.layerGroup().addTo(map);

// Centro del mapa y nivel de acercamiento
var ucr = L.latLng([9.93541338, -84.05142080]);
var zoomLevel = 9;

// Definición de la vista del mapa
map.setView(ucr, zoomLevel);

// Adición de capa
esriLayer = L.tileLayer.provider("Esri.WorldImagery").addTo(map);
osmLayer = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
Positron = L.tileLayer.provider("CartoDB.Positron").addTo(map);

/*Control Mapas Base*/
var baseMaps = {
	"ESRI World Imagery": esriLayer,
	"OpenStreetMap": osmLayer,
	"CartoDB.Positron" : Positron
};

/*Control Capas*/
var overlayMaps = {
	
	
};

/*Posición Control de Capas*/
control_layers = L.control.layers(baseMaps, overlayMaps, {position:'topleft', collapsed:true} ).addTo(map);

/*Posición Control de ZOOM*/
L.control.zoom({position:'topright'} ).addTo(map);

/*Posición Control de SCALA*/
L.control.scale({position:'topright', imperial:false} ).addTo(map);

/*Control de medidas*/
L.control.polylineMeasure({position:'topleft', unit:'metres', showBearings:true, clearMeasurementsOnStop: false, showClearControl: true, showUnitControl: true}).addTo(map);

/*Posisción del Mouse*/
L.Control.Coordinates = L.Control.extend({
  options: {
    position: 'bottomleft',
	latitudeText: 'lat.',
    longitudeText: 'lon.',
    promptText: 'Ctrl+C copia las coordenadas',
    precision: 6
  },

  initialize: function (options) {
    L.Control.prototype.initialize.call(this, options)
  },

  onAdd: function (map) {
    var className = 'leaflet-control-coordinates'
    var that = this
    var container = this._container = L.DomUtil.create('div', className)
    this.visible = false

    L.DomUtil.addClass(container, 'hidden')

    L.DomEvent.disableClickPropagation(container)

    this._addText(container, map)

    L.DomEvent.addListener(container, 'click', function () {
      var lat = L.DomUtil.get(that._lat)
      var lng = L.DomUtil.get(that._lng)
      var latTextLen = this.options.latitudeText.length + 1
      var lngTextLen = this.options.longitudeText.length + 1
      var latTextIndex = lat.textContent.indexOf(this.options.latitudeText) + latTextLen
      var lngTextIndex = lng.textContent.indexOf(this.options.longitudeText) + lngTextLen
      var latCoordinate = lat.textContent.substr(latTextIndex)
      var lngCoordinate = lng.textContent.substr(lngTextIndex)

      window.prompt(this.options.promptText, latCoordinate + ' ' + lngCoordinate)
    }, this)

    return container
  },

  _addText: function (container, context) {
    this._lat = L.DomUtil.create('span', 'leaflet-control-coordinates-lat', container)
    this._lng = L.DomUtil.create('span', 'leaflet-control-coordinates-lng', container)

    return container
  },

  /**
   * This method should be called when user clicks the map.
   * @param event object
   */
  setCoordinates: function (obj) {
    if (!this.visible) {
      L.DomUtil.removeClass(this._container, 'hidden')
    }

    if (obj.latlng) {
      L.DomUtil.get(this._lat).innerHTML = '<strong>' + this.options.latitudeText + ':</strong> ' + obj.latlng.lat.toFixed(this.options.precision).toString()
      L.DomUtil.get(this._lng).innerHTML = '<strong>' + this.options.longitudeText + ':</strong> ' + obj.latlng.lng.toFixed(this.options.precision).toString()
    }
  }
})


var c = new L.Control.Coordinates(); 
c.addTo(map);

map.on('click', function(e) {
	c.setCoordinates(e);
});

/*///////////////////////////////////////////////////////////////////////////////*/

function makemap(params) {
    var popup = null;
    for (var i = 0; i < params.popups.length; i++) {
        popup = params.popups[i];
        var marker = L.marker(popup.latlon).addTo(map);
		marker.bindPopup("<div> <img width=400   src=" + popup.img + " /></div>");
        if (popup.open === true){
            marker.openPopup();
			
        }

    }
	
};


makemap({
	popups:
		[{img:"img/13.png",
		latlon:[9.99173601666667,-84.7046339166667],
		title:"13", 
		open: false,
		},
		],
	});

makemap({
	popups:[{img:"img/16.png",latlon:[9.93260254444444,-84.7206791666667],title:"16", open: false,},],});
makemap({
	popups:[{img:"img/17.png",latlon:[9.92972042222222,-84.7112854916667],title:"17", open: false,},],});
makemap({
	popups:[{img:"img/18.png",latlon:[9.929828775,-84.6919342694445],title:"18", open: false,},],});
makemap({
	popups:[{img:"img/24.png",latlon:[9.90136778333333,-84.6267821305556],title:"24", open: false,},],});
makemap({
	popups:[{img:"img/25.png",latlon:[9.89598344722222,-84.5605847888889],title:"25", open: false,},],});
makemap({popups:[{img:"img/32.png",latlon:[10.022541275,-84.7343986111111],title:"32", open: false,},],});
makemap({
	popups:[{img:"img/204.png",latlon:[10.0700522833333,-84.77129475],title:"204", open: false,},],});
makemap({
	popups:[{img:"img/473.png",latlon:[9.91114146944445,-84.5234033833333],title:"473", open: false,},],});
makemap({
	popups:[{img:"img/1304.png",latlon:[9.93656148333333,-84.5217980888889],title:"1304", open: false,},],});
makemap({
	popups:[{img:"img/12A.png",latlon:[9.99187411944444,-84.7057100222222],title:"12A", open: false,},],});
makemap({
	popups:[{img:"img/205A.png",latlon:[10.0609085972222,-84.7588507555556],title:"205A", open: false,},],});
makemap({
	popups:[{img:"img/210C.png",latlon:[9.99552168055556,-84.6734348194445],title:"210C", open: false,},],});
makemap({
	popups:[{img:"img/4A.png",latlon:[9.98001894722222,-84.7754998083333],title:"4A", open: false,},],});
makemap({
	popups:[{img:"img/A11.png",latlon:[10.1031236472222,-84.8747396333333],title:"A11", open: false,},],});
makemap({
	popups:[{img:"img/A9.png",latlon:[10.0879462444444,-84.8462763444444],title:"A9", open: false,},],});
makemap({
	popups:[{img:"img/P206A.png",latlon:[8.91793521666667,-83.4172185111111],title:"P206A", open: false,},],});
makemap({
	popups:[{img:"img/P211A.png",latlon:[8.89027609166667,-83.3793598722222],title:"P211A", open: false,},],});
makemap({
	popups:[{img:"img/P213A.png",latlon:[8.88067714444444,-83.3659042083333],title:"P213A", open: false,},],});
makemap({
	popups:[{img:"img/P216.png",latlon:[8.87077055555556,-83.3438068361111],title:"P216", open: false,},],});
makemap({
	popups:[{img:"img/P221A.png",latlon:[8.8401254,-83.3102271694444],title:"P221A", open: false,},],});
makemap({
	popups:[{img:"img/P224A.png",latlon:[8.82164575555556,-83.2899180833333],title:"P224A", open: false,},],});
makemap({
	popups:[{img:"img/P228A.png",latlon:[8.79832487777778,-83.25166055],title:"P228A", open: false,},],});
makemap({
	popups:[{img:"img/P230A.png",latlon:[8.783100925,-83.2393995416667],title:"P230A", open: false,},],});
makemap({
	popups:[{img:"img/P237A.png",latlon:[8.74258905277778,-83.1772520527778],title:"P237A", open: false,},],});
makemap({
	popups:[{img:"img/P240A.png",latlon:[8.71658648611111,-83.1573793277778],title:"P240A", open: false,},],});
makemap({
	popups:[{img:"img/P242.png",latlon:[8.705305075,-83.1430820361111],title:"P242", open: false,},],});
makemap({
	popups:[{img:"img/P245A.png",latlon:[8.69985066666667,-83.1103699027778],title:"P245A", open: false,},],});
makemap({
	popups:[{img:"img/P251A.png",latlon:[8.66564455833333,-83.0565739611111],title:"P251A", open: false,},],});
makemap({
	popups:[{img:"img/P253.png",latlon:[8.66331052777778,-83.0410674444444],title:"P253", open: false,},],});
makemap({
	popups:[{img:"img/P254A.png",latlon:[8.66411508888889,-83.0283089833333],title:"P254A", open: false,},],});
makemap({
	popups:[{img:"img/P255B.png",latlon:[8.66440703888889,-83.0080560472222],title:"P255B", open: false,},],});
makemap({
	popups:[{img:"img/P263A.png",latlon:[8.64214469166667,-82.9417286805556],title:"P263A", open: false,},],});
makemap({
	popups:[{img:"img/P265A.png",latlon:[8.62407272777778,-82.9154203916667],title:"P265A", open: false,},],});
makemap({
	popups:[{img:"img/P267A.png",latlon:[8.60436570833333,-82.9019684694445],title:"P267A", open: false,},],});
makemap({
	popups:[{img:"img/P275.png",latlon:[8.54118278055556,-82.8518348277778],title:"P275", open: false,},],});
makemap({
	popups:[{img:"img/P416.png",latlon:[8.75352661944445,-83.3474913638889],title:"P416", open: false,},],});
makemap({
	popups:[{img:"img/P426.png",latlon:[8.74328498888889,-83.4027553833333],title:"P426", open: false,},],});
makemap({
	popups:[{img:"img/P427.png",latlon:[8.73461862777778,-83.4162722194445],title:"P427", open: false,},],});
makemap({
	popups:[{img:"img/P430.png",latlon:[8.72630482222222,-83.4350287777778],title:"P430", open: false,},],});
makemap({
	popups:
	[{img:"img/P431.png",latlon:[8.70677948611111,-83.4876457916667],title:"P431", open: false,},],});
makemap({
	popups:[{img:"img/P462.png",latlon:[8.46212006944444,-83.2808285111111],title:"P462", open: false,},],});
