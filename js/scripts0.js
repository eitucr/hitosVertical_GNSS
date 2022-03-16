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
var zoomLevel = 7;

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
		[{img:"img/1Q.png",
		latlon:[9.4247805774,-84.1700500185],
		title: "1Q",
		open: false,
		},
		],	
  });
  



makemap({popups:[{img:"img/2G46.png",latlon:[10.31095,-85.7751861111111],title:"2G46", open: false,},],});
makemap({popups:[{img:"img/2G48.png",latlon:[10.3126722222222,-85.7889333333333],title:"2G48", open: false,},],});
makemap({popups:[{img:"img/2G302.png",latlon:[9.90129722222222,-85.5885472222222],title:"2G302", open: false,},],});
makemap({popups:[{img:"img/2G339.png",latlon:[10.1678555555556,-85.7981],title:"2G339", open: false,},],});
makemap({popups:[{img:"img/2G346.png",latlon:[10.2112388888889,-85.7587805555556],title:"2G346", open: false,},],});
makemap({popups:[{img:"img/2G347.png",latlon:[10.2221888888889,-85.7519916666667],title:"2G347", open: false,},],});
makemap({popups:[{img:"img/2G429.png",latlon:[10.3600916666667,-85.7048027777778],title:"2G429", open: false,},],});
makemap({popups:[{img:"img/2G430.png",latlon:[10.3513138888889,-85.71145],title:"2G430", open: false,},],});
makemap({popups:[{img:"img/2G432.png",latlon:[10.3522833333333,-85.7294472222222],title:"2G432", open: false,},],});
makemap({popups:[{img:"img/2G446.png",latlon:[10.3149444444444,-85.8047361111111],title:"2G446", open: false,},],});
makemap({popups:[{img:"img/4A.png",latlon:[9.98033611111111,-84.7770333333333],title:"4A", open: false,},],});
makemap({popups:[{img:"img/5L.png",latlon:[9.99201111111111,-83.0258333333333],title:"5L", open: false,},],});
makemap({popups:[{img:"img/2Q.png",latlon:[9.42441111111111,-84.1672722222222],title:"2Q", open: false,},],});
makemap({popups:[{img:"img/7L.png",latlon:[9.99313055555555,-83.0250722222222],title:"7L", open: false,},],});
makemap({popups:[{img:"img/10L.png",latlon:[9.99956944444444,-83.025825],title:"10L", open: false,},],});
makemap({popups:[{img:"img/1Q.png",latlon:[9.42478055555556,-84.17005],title:"1Q", open: false,},],});
makemap({popups:[{img:"img/12A.png",latlon:[9.99190555555555,-84.7056388888889],title:"12A", open: false,},],});
makemap({popups:[{img:"img/13.png",latlon:[9.99173611111111,-84.7046333333333],title:"13", open: false,},],});
makemap({popups:[{img:"img/16.png",latlon:[9.93261111111111,-84.7205833333333],title:"16", open: false,},],});
makemap({popups:[{img:"img/17.png",latlon:[9.92969444444444,-84.7112777777778],title:"17", open: false,},],});
makemap({popups:[{img:"img/18.png",latlon:[9.92980555555556,-84.6919444444444],title:"18", open: false,},],});
makemap({popups:[{img:"img/20L.png",latlon:[10.0940861111111,-83.5094055555556],title:"20L", open: false,},],});
makemap({popups:[{img:"img/22L.png",latlon:[10.0921916666667,-83.4882194444444],title:"22L", open: false,},],});
makemap({popups:[{img:"img/23L.png",latlon:[10.0934194444444,-83.4855361111111],title:"23L", open: false,},],});
makemap({popups:[{img:"img/24.png",latlon:[9.90119444444444,-84.6266944444444],title:"24", open: false,},],});
makemap({popups:[{img:"img/24B.png",latlon:[9.90244444444445,-84.61075],title:"24B", open: false,},],});
makemap({popups:[{img:"img/24L.png",latlon:[10.1013027777778,-83.4721444444445],title:"24L", open: false,},],});
makemap({popups:[{img:"img/25.png",latlon:[9.896,-84.5605833333333],title:"25", open: false,},],});
makemap({popups:[{img:"img/25L.png",latlon:[10.0972666666667,-83.42745],title:"25L", open: false,},],});
makemap({popups:[{img:"img/26L.png",latlon:[10.097025,-83.4267333333333],title:"26L", open: false,},],});
makemap({popups:[{img:"img/27L.png",latlon:[10.0930166666667,-83.4173694444445],title:"27L", open: false,},],});
makemap({popups:[{img:"img/28.png",latlon:[9.91255555555556,-84.5257222222222],title:"28", open: false,},],});
makemap({popups:[{img:"img/29L.png",latlon:[10.0774,-83.4121416666667],title:"29L", open: false,},],});
makemap({popups:[{img:"img/30L.png",latlon:[10.0770416666667,-83.4114972222222],title:"30L", open: false,},],});
makemap({popups:[{img:"img/32.png",latlon:[10.0224888888889,-84.7344055555556],title:"32", open: false,},],});
makemap({popups:[{img:"img/36L.png",latlon:[10.0649777777778,-83.3671666666667],title:"36L", open: false,},],});
makemap({popups:[{img:"img/40B.png",latlon:[9.95741666666667,-84.3435],title:"40B", open: false,},],});
makemap({popups:[{img:"img/40L.png",latlon:[10.0467972222222,-83.333725],title:"40L", open: false,},],});
makemap({popups:[{img:"img/41L.png",latlon:[10.0465444444444,-83.3259222222222],title:"41L", open: false,},],});
makemap({popups:[{img:"img/42A.png",latlon:[9.96247222222222,-84.3181666666667],title:"42A", open: false,},],});
makemap({popups:[{img:"img/43.png",latlon:[9.96886111111111,-84.2956111111111],title:"43", open: false,},],});
makemap({popups:[{img:"img/43L.png",latlon:[10.0460222222222,-83.3077861111111],title:"43L", open: false,},],});
makemap({popups:[{img:"img/44.png",latlon:[9.97030555555556,-84.2746388888889],title:"44", open: false,},],});
makemap({popups:[{img:"img/44L.png",latlon:[10.0450333333333,-83.2922777777778],title:"44L", open: false,},],});
makemap({popups:[{img:"img/48.png",latlon:[9.97242222222222,-84.2234166666667],title:"48", open: false,},],});
makemap({popups:[{img:"img/49B.png",latlon:[9.97744444444444,-84.1945277777778],title:"49B", open: false,},],});
makemap({popups:[{img:"img/51L.png",latlon:[10.0248638888889,-83.2253194444445],title:"51L", open: false,},],});
makemap({popups:[{img:"img/53L.png",latlon:[10.0177916666667,-83.2115333333333],title:"53L", open: false,},],});
makemap({popups:[{img:"img/54L.png",latlon:[10.0167222222222,-83.2099388888889],title:"54L", open: false,},],});
makemap({popups:[{img:"img/66.png",latlon:[9.99467222222222,-84.1168611111111],title:"66", open: false,},],});
makemap({popups:[{img:"img/67B.png",latlon:[9.98711111111111,-84.1085555555556],title:"67B", open: false,},],});
makemap({popups:[{img:"img/69L.png",latlon:[9.90861944444445,-82.9860333333333],title:"69L", open: false,},],});
makemap({popups:[{img:"img/72L.png",latlon:[9.88498333333333,-82.9668944444444],title:"72L", open: false,},],});
makemap({popups:[{img:"img/76L.png",latlon:[9.84510555555556,-82.9366027777778],title:"76L", open: false,},],});
makemap({popups:[{img:"img/78L.png",latlon:[9.82521666666667,-82.9196916666667],title:"78L", open: false,},],});
makemap({popups:[{img:"img/105B.png",latlon:[9.90572222222222,-83.6839166666667],title:"105B", open: false,},],});
makemap({popups:[{img:"img/125.png",latlon:[9.65945,-84.0227805555556],title:"125", open: false,},],});
makemap({popups:[{img:"img/160.png",latlon:[10.1954722222222,-83.6446666666667],title:"160", open: false,},],});
makemap({popups:[{img:"img/196.png",latlon:[9.91094444444444,-84.0852222222222],title:"196", open: false,},],});
makemap({popups:[{img:"img/204.png",latlon:[10.0700555555556,-84.77125],title:"204", open: false,},],});
makemap({popups:[{img:"img/205A.png",latlon:[10.0609444444444,-84.7588611111111],title:"205A", open: false,},],});
makemap({popups:[{img:"img/210C.png",latlon:[9.99552222222222,-84.6734333333333],title:"210C", open: false,},],});
makemap({popups:[{img:"img/238A.png",latlon:[10.0657777777778,-84.3058055555555],title:"238A", open: false,},],});
makemap({popups:[{img:"img/250AC.png",latlon:[9.97027777777778,-84.0885],title:"250AC", open: false,},],});
makemap({popups:[{img:"img/272A.png",latlon:[9.88630555555556,-83.7458611111111],title:"272A", open: false,},],});
makemap({popups:[{img:"img/291.png",latlon:[9.76063055555556,-83.8197416666667],title:"291", open: false,},],});
makemap({popups:[{img:"img/302.png",latlon:[9.91847222222222,-83.8799444444444],title:"302", open: false,},],});
makemap({popups:[{img:"img/309A.png",latlon:[9.97711111111111,-83.8459166666667],title:"309A", open: false,},],});
makemap({popups:[{img:"img/309JK.png",latlon:[9.92311111111111,-84.1361111111111],title:"309JK", open: false,},],});
makemap({popups:[{img:"img/316.png",latlon:[10.015,-84.0985277777778],title:"316", open: false,},],});
makemap({popups:[{img:"img/317.png",latlon:[10.0378305555556,-84.0890833333333],title:"317", open: false,},],});
makemap({popups:[{img:"img/348B.png",latlon:[9.57781944444444,-83.7610444444445],title:"348B", open: false,},],});
makemap({popups:[{img:"img/400C.png",latlon:[9.93094444444444,-84.17825],title:"400C", open: false,},],});
makemap({popups:[{img:"img/401.png",latlon:[9.93213888888889,-84.181],title:"401", open: false,},],});
makemap({popups:[{img:"img/402J.png",latlon:[9.92994444444445,-84.2046388888889],title:"402J", open: false,},],});
makemap({popups:[{img:"img/403.png",latlon:[9.92866666666667,-84.2168888888889],title:"403", open: false,},],});
makemap({popups:[{img:"img/403A404.png",latlon:[9.92886111111111,-84.2262222222222],title:"403A404", open: false,},],});
makemap({popups:[{img:"img/405.png",latlon:[9.91566388888889,-84.2413416666667],title:"405", open: false,},],});
makemap({popups:[{img:"img/406A407.png",latlon:[9.8885,-84.22825],title:"406A407", open: false,},],});
makemap({popups:[{img:"img/407J.png",latlon:[9.88494444444445,-84.2221388888889],title:"407J", open: false,},],});
makemap({popups:[{img:"img/409.png",latlon:[9.89913888888889,-84.0660833333333],title:"409", open: false,},],});
makemap({popups:[{img:"img/442J.png",latlon:[9.84833333333333,-84.3171694444444],title:"442J", open: false,},],});
makemap({popups:[{img:"img/460.png",latlon:[9.90819444444445,-84.44075],title:"460", open: false,},],});
makemap({popups:[{img:"img/463.png",latlon:[9.91341666666667,-84.4451944444445],title:"463", open: false,},],});
makemap({popups:[{img:"img/473.png",latlon:[9.91116666666667,-84.5234166666667],title:"473", open: false,},],});
makemap({popups:[{img:"img/504.png",latlon:[10.1293888888889,-84.9020277777778],title:"504", open: false,},],});
makemap({popups:[{img:"img/547A.png",latlon:[10.8338027777778,-85.6124861111111],title:"547A", open: false,},],});
makemap({popups:[{img:"img/568A.png",latlon:[10.003375,-84.2189222222222],title:"568A", open: false,},],});
makemap({popups:[{img:"img/570A.png",latlon:[9.99297222222222,-84.2323888888889],title:"570A", open: false,},],});
makemap({popups:[{img:"img/659A.png",latlon:[8.64968611111111,-83.1772888888889],title:"659A", open: false,},],});
makemap({popups:[{img:"img/705AB.png",latlon:[9.47581944444445,-83.6795],title:"705AB", open: false,},],});
makemap({popups:[{img:"img/709AB.png",latlon:[9.46133333333333,-83.7096111111111],title:"709AB", open: false,},],});
makemap({popups:[{img:"img/798.png",latlon:[10.2677,-84.1834638888889],title:"798", open: false,},],});
makemap({popups:[{img:"img/1048.png",latlon:[9.91608333333333,-83.8103888888889],title:"1048", open: false,},],});
makemap({popups:[{img:"img/1062.png",latlon:[9.96597222222222,-83.7322777777778],title:"1062", open: false,},],});
makemap({popups:[{img:"img/1113.png",latlon:[10.5623416666667,-85.5908472222222],title:"1113", open: false,},],});
makemap({popups:[{img:"img/1114.png",latlon:[10.5615694444444,-85.5909972222222],title:"1114", open: false,},],});
makemap({popups:[{img:"img/1304.png",latlon:[9.93655555555556,-84.5217777777778],title:"1304", open: false,},],});
makemap({popups:[{img:"img/1363.png",latlon:[9.96289722222222,-84.360575],title:"1363", open: false,},],});
makemap({popups:[{img:"img/1365A.png",latlon:[9.97944722222222,-84.3803861111111],title:"1365A", open: false,},],});
makemap({popups:[{img:"img/1366A.png",latlon:[9.97686111111111,-84.4005833333334],title:"1366A", open: false,},],});
makemap({popups:[{img:"img/1376.png",latlon:[9.94936111111111,-84.3225277777778],title:"1376", open: false,},],});
makemap({popups:[{img:"img/1513.png",latlon:[9.94391666666667,-84.1056111111111],title:"1513", open: false,},],});
makemap({popups:[{img:"img/1521.png",latlon:[9.91194444444444,-84.0265277777778],title:"1521", open: false,},],});
makemap({popups:[{img:"img/1521A.png",latlon:[9.91025,-84.0179722222222],title:"1521A", open: false,},],});
makemap({popups:[{img:"img/1522.png",latlon:[9.90425,-84.0102777777778],title:"1522", open: false,},],});
makemap({popups:[{img:"img/1545.png",latlon:[9.96241666666667,-83.8330277777778],title:"1545", open: false,},],});
makemap({popups:[{img:"img/A6.png",latlon:[10.1000361111111,-84.8099138888889],title:"A6", open: false,},],});
makemap({popups:[{img:"img/A9.png",latlon:[10.0879444444444,-84.84625],title:"A9", open: false,},],});
makemap({popups:[{img:"img/A11.png",latlon:[10.1031666666667,-84.8747222222222],title:"A11", open: false,},],});
makemap({popups:[{img:"img/A12.png",latlon:[10.1624361111111,-84.9182222222222],title:"A12", open: false,},],});
makemap({popups:[{img:"img/A14.png",latlon:[10.1963055555556,-84.9534722222222],title:"A14", open: false,},],});
makemap({popups:[{img:"img/A15A.png",latlon:[10.2101111111111,-84.9621388888889],title:"A15A", open: false,},],});
makemap({popups:[{img:"img/A18A.png",latlon:[10.2696111111111,-85.0135],title:"A18A", open: false,},],});
makemap({popups:[{img:"img/A19.png",latlon:[10.2678333333333,-85.0225277777778],title:"A19", open: false,},],});
makemap({popups:[{img:"img/A21B.png",latlon:[10.3020833333333,-85.0369722222222],title:"A21B", open: false,},],});
makemap({popups:[{img:"img/A23A.png",latlon:[10.3214444444444,-85.0470277777778],title:"A23A", open: false,},],});
makemap({popups:[{img:"img/A47A.png",latlon:[10.6502222222222,-85.4633888888889],title:"A47A", open: false,},],});
makemap({popups:[{img:"img/A48A.png",latlon:[10.6689444444444,-85.4816388888889],title:"A48A", open: false,},],});
makemap({popups:[{img:"img/A52A.png",latlon:[10.7231944444444,-85.5105],title:"A52A", open: false,},],});
makemap({popups:[{img:"img/A55.png",latlon:[10.7535416666667,-85.5157944444444],title:"A55", open: false,},],});
makemap({popups:[{img:"img/A60.png",latlon:[10.8125,-85.5444166666667],title:"A60", open: false,},],});
makemap({popups:[{img:"img/A61A.png",latlon:[10.8154166666667,-85.5439166666667],title:"A61A", open: false,},],});
makemap({popups:[{img:"img/A80A.png",latlon:[11.0523611111111,-85.626],title:"A80A", open: false,},],});
makemap({popups:[{img:"img/A135B.png",latlon:[10.4718555555556,-84.6458111111111],title:"A135B", open: false,},],});
makemap({popups:[{img:"img/A205A.png",latlon:[10.0609055555556,-84.7588722222222],title:"A205A", open: false,},],});
makemap({popups:[{img:"img/A515.png",latlon:[10.3498055555556,-85.0775277777778],title:"A515", open: false,},],});
makemap({popups:[{img:"img/A516A.png",latlon:[10.3810833333333,-85.0843888888889],title:"A516A", open: false,},],});
makemap({popups:[{img:"img/BUVIS.png",latlon:[9.55405934444445,-83.7565820833333],title:"BUVIS", open: false,},],});
makemap({popups:[{img:"img/E56.png",latlon:[10.9976567473364,-85.6877777777778],title:"E56", open: false,},],});
makemap({popups:[{img:"img/G68A.png",latlon:[10.1249416666667,-85.4305027777778],title:"G68A", open: false,},],});
makemap({popups:[{img:"img/G73.png",latlon:[10.1084166666667,-85.3891388888889],title:"G73", open: false,},],});
makemap({popups:[{img:"img/G74.png",latlon:[10.1036666666667,-85.3823333333333],title:"G74", open: false,},],});
/*makemap({popups:[{img:"img/G115.png",latlon:[0,0],title:"G115", open: false,},],});*/
makemap({popups:[{img:"img/G126.png",latlon:[10.0261111111111,-85.26225],title:"G126", open: false,},],});
makemap({popups:[{img:"img/G207.png",latlon:[10.4784555555556,-85.0376138888889],title:"G207", open: false,},],});
makemap({popups:[{img:"img/G218.png",latlon:[10.4711305555556,-84.9677166666667],title:"G218", open: false,},],});
makemap({popups:[{img:"img/G220A.png",latlon:[10.4707060416667,-84.9664563083333],title:"G220A", open: false,},],});
makemap({popups:[{img:"img/G417.png",latlon:[10.2242527777778,-85.5366055555556],title:"G417", open: false,},],});
makemap({popups:[{img:"img/GH.png",latlon:[9.909025,-82.9864555555556],title:"GH", open: false,},],});
makemap({popups:[{img:"img/H0.png",latlon:[10.0017777777778,-84.1169138888889],title:"H0", open: false,},],});
makemap({popups:[{img:"img/H9.png",latlon:[10.0910055555556,-84.1669805555556],title:"H9", open: false,},],});
makemap({popups:[{img:"img/J35.png",latlon:[9.91466111111111,-83.8176972222222],title:"J35", open: false,},],});
makemap({popups:[{img:"img/J55.png",latlon:[9.94619444444444,-84.0533055555555],title:"J55", open: false,},],});
makemap({popups:[{img:"img/J56.png",latlon:[9.93944444444444,-84.0546944444444],title:"J56", open: false,},],});
makemap({popups:[{img:"img/LIB.png",latlon:[10.6421944444444,-85.4538055555556],title:"LIB", open: false,},],});
makemap({popups:[{img:"img/P109A.png",latlon:[9.30311111111111,-83.6571944444445],title:"P109A", open: false,},],});
makemap({popups:[{img:"img/P113.png",latlon:[9.26686111111111,-83.632],title:"P113", open: false,},],});
makemap({popups:[{img:"img/P118P.png",latlon:[9.28061111111111,-83.5902222222222],title:"P118P", open: false,},],});
makemap({popups:[{img:"img/P123.png",latlon:[9.25302777777778,-83.5658888888889],title:"P123", open: false,},],});
makemap({popups:[{img:"img/P129.png",latlon:[9.25102777777778,-83.5092777777778],title:"P129", open: false,},],});
makemap({popups:[{img:"img/P131.png",latlon:[9.2475,-83.4945],title:"P131", open: false,},],});
makemap({popups:[{img:"img/P134A.png",latlon:[9.22497222222222,-83.4735555555556],title:"P134A", open: false,},],});
makemap({popups:[{img:"img/P140A.png",latlon:[9.17680555555556,-83.4264166666667],title:"P140A", open: false,},],});
makemap({popups:[{img:"img/P142A.png",latlon:[9.17497222222222,-83.4155277777778],title:"P142A", open: false,},],});
makemap({popups:[{img:"img/P145A.png",latlon:[9.15052777777778,-83.37575],title:"P145A", open: false,},],});
makemap({popups:[{img:"img/P145B.png",latlon:[9.14966666666667,-83.3749722222222],title:"P145B", open: false,},],});
makemap({popups:[{img:"img/P146A.png",latlon:[9.15005555555556,-83.3655833333333],title:"P146A", open: false,},],});
makemap({popups:[{img:"img/P157B.png",latlon:[9.09622222222222,-83.2793333333333],title:"P157B", open: false,},],});
makemap({popups:[{img:"img/P158B.png",latlon:[9.09166666666667,-83.2706388888889],title:"P158B", open: false,},],});
makemap({popups:[{img:"img/P161.png",latlon:[9.07480555555556,-83.2756388888889],title:"P161", open: false,},],});
makemap({popups:[{img:"img/P171A.png",latlon:[8.99325,-83.2378055555555],title:"P171A", open: false,},],});
makemap({popups:[{img:"img/P174B.png",latlon:[8.98772222222222,-83.2589166666667],title:"P174B", open: false,},],});
makemap({popups:[{img:"img/P181.png",latlon:[8.97222222222222,-83.3041666666667],title:"P181", open: false,},],});
makemap({popups:[{img:"img/P183.png",latlon:[8.95722222222222,-83.3230555555556],title:"P183", open: false,},],});
makemap({popups:[{img:"img/P191A.png",latlon:[8.96138888888889,-83.3972222222222],title:"P191A", open: false,},],});
makemap({popups:[{img:"img/P193A.png",latlon:[8.96605555555555,-83.4173333333333],title:"P193A", open: false,},],});
makemap({popups:[{img:"img/P199.png",latlon:[8.96001944444444,-83.4597611111111],title:"P199", open: false,},],});
makemap({popups:[{img:"img/P200.png",latlon:[8.95693888888889,-83.4603027777778],title:"P200", open: false,},],});
makemap({popups:[{img:"img/P202.png",latlon:[8.94180555555556,-83.4568888888889],title:"P202", open: false,},],});
makemap({popups:[{img:"img/P206A.png",latlon:[8.91794444444444,-83.4171944444445],title:"P206A", open: false,},],});
makemap({popups:[{img:"img/P211A.png",latlon:[8.89027777777778,-83.3793611111111],title:"P211A", open: false,},],});
makemap({popups:[{img:"img/P213A.png",latlon:[8.88069444444445,-83.3658888888889],title:"P213A", open: false,},],});
makemap({popups:[{img:"img/P216.png",latlon:[8.87075,-83.3438055555556],title:"P216", open: false,},],});
makemap({popups:[{img:"img/P221A.png",latlon:[8.84011111111111,-83.3102222222222],title:"P221A", open: false,},],});
makemap({popups:[{img:"img/P224A.png",latlon:[8.82169444444445,-83.2899166666667],title:"P224A", open: false,},],});
makemap({popups:[{img:"img/P228A.png",latlon:[8.79833333333333,-83.2516666666667],title:"P228A", open: false,},],});
makemap({popups:[{img:"img/P230A.png",latlon:[8.78311111111111,-83.2394166666667],title:"P230A", open: false,},],});
makemap({popups:[{img:"img/P237A.png",latlon:[8.74261111111111,-83.17725],title:"P237A", open: false,},],});
makemap({popups:[{img:"img/P240A.png",latlon:[8.71658333333333,-83.1573888888889],title:"P240A", open: false,},],});
makemap({popups:[{img:"img/P241.png",latlon:[8.71288888888889,-83.1509166666667],title:"P241", open: false,},],});
makemap({popups:[{img:"img/P242.png",latlon:[8.70530555555555,-83.1430833333333],title:"P242", open: false,},],});
makemap({popups:[{img:"img/P245A.png",latlon:[8.69983333333333,-83.1103611111111],title:"P245A", open: false,},],});
makemap({popups:[{img:"img/P251A.png",latlon:[8.66566666666667,-83.0565833333333],title:"P251A", open: false,},],});
makemap({popups:[{img:"img/P253.png",latlon:[8.66336111111111,-83.0410555555556],title:"P253", open: false,},],});
makemap({popups:[{img:"img/P254A.png",latlon:[8.66413888888889,-83.0282777777778],title:"P254A", open: false,},],});
makemap({popups:[{img:"img/P255B.png",latlon:[8.66441666666667,-83.0080555555556],title:"P255B", open: false,},],});
makemap({popups:[{img:"img/P257A.png",latlon:[8.65955555555556,-82.9978888888889],title:"P257A", open: false,},],});
makemap({popups:[{img:"img/P263A.png",latlon:[8.64216666666667,-82.94175],title:"P263A", open: false,},],});
makemap({popups:[{img:"img/P265A.png",latlon:[8.62411111111111,-82.9154166666667],title:"P265A", open: false,},],});
makemap({popups:[{img:"img/P267A.png",latlon:[8.60438888888889,-82.9019166666667],title:"P267A", open: false,},],});
makemap({popups:[{img:"img/P275.png",latlon:[8.54118055555556,-82.8518361111111],title:"P275", open: false,},],});
makemap({popups:[{img:"img/P416.png",latlon:[8.75352252777778,-83.3474952083333],title:"P416", open: false,},],});
makemap({popups:[{img:"img/P417.png",latlon:[8.75011122222222,-83.3564084416667],title:"P417", open: false,},],});
makemap({popups:[{img:"img/P426.png",latlon:[8.74328064722222,-83.4110893194445],title:"P426", open: false,},],});
makemap({popups:[{img:"img/P427.png",latlon:[8.73461142222222,-83.4162718611111],title:"P427", open: false,},],});
makemap({popups:[{img:"img/P430.png",latlon:[8.72629939444444,-83.4350286083333],title:"P430", open: false,},],});
makemap({popups:[{img:"img/P431.png",latlon:[8.70677503055556,-83.4876494166667],title:"P431", open: false,},],});
makemap({popups:[{img:"img/P443.png",latlon:[8.59763676388889,-83.4280651055556],title:"P443", open: false,},],});
makemap({popups:[{img:"img/P446.png",latlon:[8.57622056944444,-83.3927363888889],title:"P446", open: false,},],});
makemap({popups:[{img:"img/P450.png",latlon:[8.55707809722222,-83.3556538944444],title:"P450", open: false,},],});
makemap({popups:[{img:"img/P455.png",latlon:[8.53546416666667,-83.3054804194444],title:"P455", open: false,},],});
makemap({popups:[{img:"img/P462.png",latlon:[8.46211353333333,-83.2808312638889],title:"P462", open: false,},],});
makemap({popups:[{img:"img/P554.png",latlon:[8.68530555555556,-83.5679444444444],title:"P554", open: false,},],});
makemap({popups:[{img:"img/P647A.png",latlon:[9.17197222222222,-83.3351944444445],title:"P647A", open: false,},],});
makemap({popups:[{img:"img/Q8.png",latlon:[9.42988978888889,-84.1600794722222],title:"Q8", open: false,},],});
makemap({popups:[{img:"img/R15.png",latlon:[9.80149722222222,-84.606575],title:"R15", open: false,},],});
makemap({popups:[{img:"img/R81.png",latlon:[9.05712333055556,-83.639852675],title:"R81", open: false,},],});
makemap({popups:[{img:"img/57.png",latlon:[9.925,-84.0799722222222],title:"57", open: false,},],});
makemap({popups:[{img:"img/1087B.png",latlon:[9.62458611111111,-82.8304194444445],title:"1087B", open: false,},],});
makemap({popups:[{img:"img/11.png",latlon:[9.99023611111111,-84.7109444444445],title:"11", open: false,},],});
makemap({popups:[{img:"img/154.png",latlon:[10.1230027777778,-83.5372305555556],title:"154", open: false,},],});
makemap({popups:[{img:"img/155A.png",latlon:[10.1308388888889,-83.5487055555556],title:"155A", open: false,},],});
makemap({popups:[{img:"img/156.png",latlon:[10.1402194444444,-83.5602222222222],title:"156", open: false,},],});
makemap({popups:[{img:"img/161.png",latlon:[10.2084611111111,-83.6787666666667],title:"161", open: false,},],});
makemap({popups:[{img:"img/186A.png",latlon:[9.8124,-82.9320361111111],title:"186A", open: false,},],});
makemap({popups:[{img:"img/H6.png",latlon:[10.07805,-84.1575027777778],title:"H6", open: false,},],});
makemap({popups:[{img:"img/H10.png",latlon:[10.0991944444444,-84.166025],title:"H10", open: false,},],});
makemap({popups:[{img:"img/H11.png",latlon:[10.1026027777778,-84.1683805555556],title:"H11", open: false,},],});
makemap({popups:[{img:"img/H12.png",latlon:[10.111925,-84.1637444444445],title:"H12", open: false,},],});
makemap({popups:[{img:"img/H13.png",latlon:[10.1174611111111,-84.1632361111111],title:"H13", open: false,},],});
makemap({popups:[{img:"img/H14.png",latlon:[10.1230972222222,-84.1646583333333],title:"H14", open: false,},],});
makemap({popups:[{img:"img/H15.png",latlon:[10.1269305555556,-84.1652305555556],title:"H15", open: false,},],});
makemap({popups:[{img:"img/H16.png",latlon:[10.1347388888889,-84.1620388888889],title:"H16", open: false,},],});
makemap({popups:[{img:"img/H1.png",latlon:[10.0211444444444,-84.1237805555556],title:"H1", open: false,},],});
makemap({popups:[{img:"img/374.png",latlon:[10.0206944444444,-84.1235833333333],title:"374", open: false,},],});
makemap({popups:[{img:"img/375A.png",latlon:[10.0492222222222,-84.1351388888889],title:"375A", open: false,},],});
makemap({popups:[{img:"img/H7.png",latlon:[10.0841083333333,-84.1592111111111],title:"H7", open: false,},],});
makemap({popups:[{img:"img/H10A.png",latlon:[10.1044333333333,-84.1642916666667],title:"H10A", open: false,},],});
makemap({popups:[{img:"img/386.png",latlon:[10.15835,-84.1558305555556],title:"386", open: false,},],});
makemap({popups:[{img:"img/144LA.png",latlon:[9.99246666666667,-83.024275],title:"144LA", open: false,},],});
makemap({popups:[{img:"img/2G64.png",latlon:[10.4393944444444,-85.767675],title:"2G64", open: false,},],});
makemap({popups:[{img:"img/228.png",latlon:[10.0838055555556,-84.4257638888889],title:"228", open: false,},],});
makemap({popups:[{img:"img/724.png",latlon:[9.3929,-83.6573472222222],title:"724", open: false,},],});
makemap({popups:[{img:"img/LaCruz.png",latlon:[11.0541083333333,-85.6338388888889],title:"La Cruz", open: false,},],});
makemap({popups:[{img:"img/861B.png",latlon:[9.49034166666667,-84.2089583333333],title:"861B", open: false,},],});
makemap({popups:[{img:"img/956.png",latlon:[9.69063611111111,-84.018475],title:"956", open: false,},],});
makemap({popups:[{img:"img/1546.png",latlon:[9.96763888888889,-83.8275833333333],title:"1546", open: false,},],});
makemap({popups:[{img:"img/Joaquín.png",latlon:[9.84998947222222,-83.8847573611111],title:"Joaquín", open: false,},],});
makemap({popups:[{img:"img/P188.png",latlon:[8.95368333333333,-83.3651583333333],title:"P188", open: false,},],});
makemap({popups:[{img:"img/295.png",latlon:[9.80736944444445,-83.8672027777778],title:"295", open: false,},],});
makemap({popups:[{img:"img/568B.png",latlon:[9.99898055555556,-84.2197611111111],title:"568B", open: false,},],});
