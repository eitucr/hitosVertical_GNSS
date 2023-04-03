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


makemap({popups:[{img:"img/P416.png",latlon:[8.75352661944445,-83.3474913638889],title:"P416",open:false}]});
makemap({popups:[{img:"img/P426.png",latlon:[8.74328498888889,-83.4027553833333],title:"P426",open:false}]});
makemap({popups:[{img:"img/P427.png",latlon:[8.73461862777778,-83.4162722194445],title:"P427",open:false}]});
makemap({popups:[{img:"img/P430.png",latlon:[8.72630482222222,-83.4350287777778],title:"P430",open:false}]});
makemap({popups:[{img:"img/P431.png",latlon:[8.70677948611111,-83.4876457916667],title:"P431",open:false}]});
makemap({popups:[{img:"img/P462.png",latlon:[8.46212006944444,-83.2808285111111],title:"P462",open:false}]});
makemap({popups:[{img:"img/P455.png",latlon:[8.53546416666667,-83.3054804194444],title:"P455",open:false}]});
makemap({popups:[{img:"img/P450.png",latlon:[8.55707809722222,-83.3556538944444],title:"P450",open:false}]});
makemap({popups:[{img:"img/P275.png",latlon:[8.54118278055556,-82.8518348277778],title:"P275",open:false}]});
makemap({popups:[{img:"img/P253.png",latlon:[8.66331052777778,-83.0410674444444],title:"P253",open:false}]});
makemap({popups:[{img:"img/P267A.png",latlon:[8.60436570833333,-82.9019684694445],title:"P267A",open:false}]});
makemap({popups:[{img:"img/P263A.png",latlon:[8.64214469166667,-82.9417286805556],title:"P263A",open:false}]});
makemap({popups:[{img:"img/P265A.png",latlon:[8.62407272777778,-82.9154203916667],title:"P265A",open:false}]});
makemap({popups:[{img:"img/P255B.png",latlon:[8.66440703888889,-83.0080560472222],title:"P255B",open:false}]});
makemap({popups:[{img:"img/P254A.png",latlon:[8.66411508888889,-83.0283089833333],title:"P254A",open:false}]});
makemap({popups:[{img:"img/P251A.png",latlon:[8.66564455833333,-83.0565739611111],title:"P251A",open:false}]});
makemap({popups:[{img:"img/P245A.png",latlon:[8.69985066666667,-83.1103699027778],title:"P245A",open:false}]});
makemap({popups:[{img:"img/P241.png",latlon:[8.71286861666667,-83.1509265972222],title:"P241",open:false}]});
makemap({popups:[{img:"img/P242.png",latlon:[8.705305075,-83.1430820361111],title:"P242",open:false}]});
makemap({popups:[{img:"img/P230A.png",latlon:[8.783100925,-83.2393995416667],title:"P230A",open:false}]});
makemap({popups:[{img:"img/P240A.png",latlon:[8.71658648611111,-83.1573793277778],title:"P240A",open:false}]});
makemap({popups:[{img:"img/P224A.png",latlon:[8.82164575555556,-83.2899180833333],title:"P224A",open:false}]});
makemap({popups:[{img:"img/P237A.png",latlon:[8.74258905277778,-83.1772520527778],title:"P237A",open:false}]});
makemap({popups:[{img:"img/P228A.png",latlon:[8.79832487777778,-83.25166055],title:"P228A",open:false}]});
makemap({popups:[{img:"img/P221A.png",latlon:[8.8401254,-83.3102271694445],title:"P221A",open:false}]});
makemap({popups:[{img:"img/P216.png",latlon:[8.87077055555556,-83.3438068361111],title:"P216",open:false}]});
makemap({popups:[{img:"img/P206A.png",latlon:[8.91793521666667,-83.4172185111111],title:"P206A",open:false}]});
makemap({popups:[{img:"img/P213A.png",latlon:[8.88067714444444,-83.3659042083333],title:"P213A",open:false}]});
makemap({popups:[{img:"img/P211A.png",latlon:[8.89027609166667,-83.3793598722222],title:"P211A",open:false}]});
makemap({popups:[{img:"img/659A.png",latlon:[8.64994455,-83.1775852694445],title:"659A",open:false}]});
makemap({popups:[{img:"img/A11.png",latlon:[10.1031236472222,-84.8747396333333],title:"A11",open:false}]});
makemap({popups:[{img:"img/204.png",latlon:[10.0700522833333,-84.77129475],title:"204",open:false}]});
makemap({popups:[{img:"img/205A.png",latlon:[10.0609085972222,-84.7588507555556],title:"205A",open:false}]});
makemap({popups:[{img:"img/4A.png",latlon:[9.98001894722222,-84.7754998083333],title:"4A",open:false}]});
makemap({popups:[{img:"img/13.png",latlon:[9.99173601666667,-84.7046339166667],title:"13",open:false}]});
makemap({popups:[{img:"img/210C.png",latlon:[9.99552168055556,-84.6734348194445],title:"210C",open:false}]});
makemap({popups:[{img:"img/1304.png",latlon:[9.93656148333333,-84.5217980888889],title:"1304",open:false}]});
makemap({popups:[{img:"img/12A.png",latlon:[9.99187411944444,-84.7057100222222],title:"12A",open:false}]});
makemap({popups:[{img:"img/32.png",latlon:[10.022541275,-84.7343986111111],title:"32",open:false}]});
makemap({popups:[{img:"img/A9.png",latlon:[10.0879462444444,-84.8462763444444],title:"A9",open:false}]});
makemap({popups:[{img:"img/16.png",latlon:[9.93260254444444,-84.7206791666667],title:"16",open:false}]});
makemap({popups:[{img:"img/17.png",latlon:[9.92972042222222,-84.7112854916667],title:"17",open:false}]});
makemap({popups:[{img:"img/18.png",latlon:[9.929828775,-84.6919342694445],title:"18",open:false}]});
makemap({popups:[{img:"img/24.png",latlon:[9.90136778333333,-84.6267821305556],title:"24",open:false}]});
makemap({popups:[{img:"img/25.png",latlon:[9.89598344722222,-84.5605847888889],title:"25",open:false}]});
makemap({popups:[{img:"img/28.png",latlon:[9.91255555555556,-84.5257222222222],title:"28",open:false}]});
makemap({popups:[{img:"img/473.png",latlon:[9.91114146944445,-84.5234033833333],title:"473",open:false}]});
makemap({popups:[{img:"img/P202.png",latlon:[8.94181755555556,-83.4568953888889],title:"P202",open:false}]});
makemap({popups:[{img:"img/P200.png",latlon:[8.95694130555556,-83.4603037222222],title:"P200",open:false}]});
makemap({popups:[{img:"img/P199.png",latlon:[8.96001969444444,-83.4597628611111],title:"P199",open:false}]});
makemap({popups:[{img:"img/P193A.png",latlon:[8.96608280555556,-83.4173436944445],title:"P193A",open:false}]});
makemap({popups:[{img:"img/P191A.png",latlon:[8.96136758333333,-83.3972280555556],title:"P191A",open:false}]});
makemap({popups:[{img:"img/P188.png",latlon:[8.95368586111111,-83.3651595833333],title:"P188",open:false}]});
makemap({popups:[{img:"img/P183.png",latlon:[8.95722569444444,-83.3230561944445],title:"P183",open:false}]});
makemap({popups:[{img:"img/P174B.png",latlon:[8.98773180555556,-83.2589265555556],title:"P174B",open:false}]});
makemap({popups:[{img:"img/P171A.png",latlon:[8.99327730555556,-83.2378184166667],title:"P171A",open:false}]});
makemap({popups:[{img:"img/P161.png",latlon:[9.07481211111111,-83.2756545555556],title:"P161",open:false}]});
makemap({popups:[{img:"img/P158B.png",latlon:[9.09164847222222,-83.2706620555556],title:"P158B",open:false}]});
makemap({popups:[{img:"img/P158A.png",latlon:[9.09164569444445,-83.2706589722222],title:"P158A",open:false}]});
makemap({popups:[{img:"img/P157B.png",latlon:[9.09622872222222,-83.2793450833333],title:"P157B",open:false}]});
makemap({popups:[{img:"img/P146A.png",latlon:[9.15007352777778,-83.3655898333333],title:"P146A",open:false}]});
makemap({popups:[{img:"img/P145B.png",latlon:[9.14967322222222,-83.3749898333333],title:"P145B",open:false}]});
makemap({popups:[{img:"img/P145A.png",latlon:[9.15055505555556,-83.3757564444444],title:"P145A",open:false}]});
makemap({popups:[{img:"img/P647A.png",latlon:[9.17199647222222,-83.3352009444444],title:"P647A",open:false}]});
makemap({popups:[{img:"img/P140A.png",latlon:[9.17683119444445,-83.4264283888889],title:"P140A",open:false}]});
makemap({popups:[{img:"img/P134A.png",latlon:[9.22499847222222,-83.4735731666667],title:"P134A",open:false}]});
makemap({popups:[{img:"img/P131.png",latlon:[9.24749569444444,-83.4945095],title:"P131",open:false}]});
makemap({popups:[{img:"img/P129.png",latlon:[9.25103430555556,-83.5092842222222],title:"P129",open:false}]});
makemap({popups:[{img:"img/P123.png",latlon:[9.25303202777778,-83.5658953333333],title:"P123",open:false}]});
makemap({popups:[{img:"img/P118P.png",latlon:[9.28063675,-83.5902398333333],title:"P118P",open:false}]});
makemap({popups:[{img:"img/P113.png",latlon:[9.26687394444445,-83.63201175],title:"P113",open:false}]});
makemap({popups:[{img:"img/709AB.png",latlon:[9.46134519444444,-83.7096259444445],title:"709AB",open:false}]});
makemap({popups:[{img:"img/705AB.png",latlon:[9.47582088888889,-83.6795065],title:"705AB",open:false}]});
makemap({popups:[{img:"img/BUVIS.png",latlon:[9.55405934444445,-83.7565820833333],title:"BUVIS",open:false}]});
makemap({popups:[{img:"img/238A.png",latlon:[10.0577438861111,-84.3058046277778],title:"238A",open:false}]});
makemap({popups:[{img:"img/1363.png",latlon:[9.96289644444445,-84.3605745527778],title:"1363",open:false}]});
makemap({popups:[{img:"img/1365A.png",latlon:[9.97943110833333,-84.3803455861111],title:"1365A",open:false}]});
makemap({popups:[{img:"img/H9.png",latlon:[10.0909914444444,-84.1669173111111],title:"H9",open:false}]});
makemap({popups:[{img:"img/H10A.png",latlon:[10.1043918861111,-84.1644476555556],title:"H10A",open:false}]});
makemap({popups:[{img:"img/228.png",latlon:[10.0829441611111,-84.4259582305556],title:"228",open:false}]});
makemap({popups:[{img:"img/5L.png",latlon:[9.99199415555555,-83.0259098361111],title:"5L",open:false}]});
makemap({popups:[{img:"img/7L.png",latlon:[9.99310500833333,-83.0250160861111],title:"7L",open:false}]});
makemap({popups:[{img:"img/10L.png",latlon:[9.99968990833333,-83.0274863361111],title:"10L",open:false}]});
makemap({popups:[{img:"img/67B.png",latlon:[9.98710716944444,-84.10857805],title:"67B",open:false}]});
makemap({popups:[{img:"img/69L.png",latlon:[9.90859564722222,-82.9859885166667],title:"69L",open:false}]});
makemap({popups:[{img:"img/72L.png",latlon:[9.88497887222222,-82.9668753361111],title:"72L",open:false}]});
makemap({popups:[{img:"img/76L.png",latlon:[9.845091525,-82.9366230722222],title:"76L",open:false}]});
makemap({popups:[{img:"img/78L.png",latlon:[9.82521002777778,-82.9196901083333],title:"78L",open:false}]});
makemap({popups:[{img:"img/160.png",latlon:[10.1954603027778,-83.64464],title:"160",open:false}]});
makemap({popups:[{img:"img/196.png",latlon:[9.91103089444444,-84.0852431222222],title:"196",open:false}]});
makemap({popups:[{img:"img/250AC.png",latlon:[9.97022283055556,-84.0884422638889],title:"250AC",open:false}]});
makemap({popups:[{img:"img/272A.png",latlon:[9.88629395555556,-83.7458717111111],title:"272A",open:false}]});
makemap({popups:[{img:"img/309JK.png",latlon:[9.92308070555555,-84.1361831194445],title:"309JK",open:false}]});
makemap({popups:[{img:"img/401.png",latlon:[9.93213436111111,-84.1809869],title:"401",open:false}]});
makemap({popups:[{img:"img/403.png",latlon:[9.92861518055556,-84.2169163777778],title:"403",open:false}]});
makemap({popups:[{img:"img/405.png",latlon:[9.91493682777778,-84.2409754],title:"405",open:false}]});
makemap({popups:[{img:"img/409.png",latlon:[9.89915015833333,-84.0660849111111],title:"409",open:false}]});
makemap({popups:[{img:"img/460.png",latlon:[9.90823465833333,-84.4407635833333],title:"460",open:false}]});
makemap({popups:[{img:"img/1062.png",latlon:[9.965983475,-83.7322847472222],title:"1062",open:false}]});
makemap({popups:[{img:"img/1521.png",latlon:[9.91209370833333,-84.0264332861111],title:"1521",open:false}]});
makemap({popups:[{img:"img/1521A.png",latlon:[9.91015638611111,-84.0181520444445],title:"1521A",open:false}]});
makemap({popups:[{img:"img/1522.png",latlon:[9.90443923333333,-84.0104556472222],title:"1522",open:false}]});
makemap({popups:[{img:"img/1545.png",latlon:[9.82745894444444,-83.8365457083333],title:"1545",open:false}]});
makemap({popups:[{img:"img/GH.png",latlon:[9.90902929722222,-82.9864638388889],title:"GH",open:false}]});
makemap({popups:[{img:"img/H0.png",latlon:[10.0017720111111,-84.1168340833333],title:"H0",open:false}]});
makemap({popups:[{img:"img/J35.png",latlon:[9.93936503055556,-83.9090930611111],title:"J35",open:false}]});
makemap({popups:[{img:"img/J55.png",latlon:[9.94625608888889,-84.0533492805556],title:"J55",open:false}]});
makemap({popups:[{img:"img/57.png",latlon:[9.92506827777778,-84.0800758666667],title:"57",open:false}]});
makemap({popups:[{img:"img/154.png",latlon:[10.1230024333333,-83.5372303111111],title:"154",open:false}]});
makemap({popups:[{img:"img/155A.png",latlon:[10.13084085,-83.5487044527778],title:"155A",open:false}]});
makemap({popups:[{img:"img/156.png",latlon:[10.1402239888889,-83.5602201388889],title:"156",open:false}]});
makemap({popups:[{img:"img/H1.png",latlon:[10.0211562888889,-84.1237485166667],title:"H1",open:false}]});
makemap({popups:[{img:"img/374.png",latlon:[10.0207052277778,-84.1235999194444],title:"374",open:false}]});
makemap({popups:[{img:"img/375A.png",latlon:[10.049224825,-84.1351293666667],title:"375A",open:false}]});
makemap({popups:[{img:"img/H7.png",latlon:[10.084097525,-84.1592094333333],title:"H7",open:false}]});
makemap({popups:[{img:"img/1546.png",latlon:[9.96763433055556,-83.8275949444444],title:"1546",open:false}]});
makemap({popups:[{img:"img/Joaquín.png",latlon:[9.84999037222222,-83.8847564277778],title:"Joaquín",open:false}]});
makemap({popups:[{img:"img/Jóse.png",latlon:[9.84998947777778,-83.8847558722222],title:"Jóse",open:false}]});
makemap({popups:[{img:"img/2Q.png",latlon:[9.42441111111111,-84.1672722222222],title:"2Q",open:false}]});
makemap({popups:[{img:"img/1Q.png",latlon:[9.42478055555556,-84.17005],title:"1Q",open:false}]});
makemap({popups:[{img:"img/309A.png",latlon:[9.97712666666667,-83.84591575],title:"309A",open:false}]});
makemap({popups:[{img:"img/R15.png",latlon:[9.80149722222222,-84.606575],title:"R15",open:false}]});
makemap({popups:[{img:"img/1519.png",latlon:[9.92003695,-84.0535728361111],title:"1519",open:false}]});
makemap({popups:[{img:"img/1513.png",latlon:[9.94389860277778,-84.1055962083333],title:"1513",open:false}]});
