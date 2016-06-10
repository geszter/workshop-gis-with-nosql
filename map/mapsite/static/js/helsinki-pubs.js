
function init() {

//Python data
var tw_Data = document.getElementById("mdb_tw").value;
var fb_Data = document.getElementById("mdb_fb").value;
var fs_Data = document.getElementById("mdb_fs").value;
var osm_Data = document.getElementById("mdb_osm").value;
var small_Data = document.getElementById("mdb_small").value;
var allpubs_Data = document.getElementById("mdb_allpubs").value;
var i = 0;


//FUNCTIONS for parsing the data
// a ReplaceAll-Method. It is needed for formating strings.  
String.prototype.replaceAll = function(search, replace)
{
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp(search, 'g'), replace);
};
// parse cyrillic characters
function unicodeToChar(text) {
   return text.replace(/u[\dA-F]{4}/gi, 
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/u/g, ''), 16));
          });
}



//CONFERENCE location
var conferenceFeature = new ol.Feature({
	type: "click",
	name: "conference location",
	geometry: new ol.geom.Point([ 24.9495854, 60.1694509]),
	content: "Conference Location"
});

var vectorSource_conference = new ol.source.Vector({});
vectorSource_conference.addFeature(conferenceFeature);

var vectorLayer_conference = new ol.layer.Vector({
	source: vectorSource_conference,
	style: new ol.style.Style({
		  image: new ol.style.Icon(({
			anchor: [0.5, 0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 1,
			scale: 2,
			src: static_url +'castle-15.svg' //source: 'https://www.mapbox.com/maki-icons/'
		  }))
		})
});




//MAP
var map = new ol.Map({
	target: document.getElementById('map'),
	layers: [
		new ol.layer.Tile({
			 source: new ol.source.OSM()
		})
	],
	//id of the div in html
    target: 'map',
	//controls for zooming
    controls: ol.control.defaults({
		attributionOptions: ({
        collapsible: false
		})
    }),
	view: new ol.View({
        center: [24.938466, 60.170014],
        zoom: 16,
		projection: ol.proj.get('EPSG:4326')
    })
});




//LAYERS
//All pubs
if (allpubs_Data){
	allpubs_Data = allpubs_Data.replaceAll("'{", "{");
	allpubs_Data = allpubs_Data.replaceAll("}'", "}");
	allpubs_Data = allpubs_Data.replaceAll("\\\\u00e4", "ae");
	
	var obj_allpubs = JSON.parse(allpubs_Data);
	
	for(var key in obj_allpubs){
		if (obj_allpubs.hasOwnProperty(key)){
			var value=obj_allpubs[key];
        // work with key and value
		}
	}
	var markerFeatures_allpubs=[];
	for ( var i=0; i < obj_allpubs.length; ++i ) {
		var markerFeature = new ol.Feature({type: 'click', geometry: new ol.geom.Point(obj_allpubs[i].geometry.coordinates), content: "a pub" });
		markerFeatures_allpubs.push(markerFeature);
	}
	var vectorSource_allpubs = new ol.source.Vector({
	  features: markerFeatures_allpubs //add an array of features
	});
	var iconStyle_allpubs = new ol.style.Style({
	  image: new ol.style.Icon(({
		anchor: [0.5, 0.5],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		opacity: 1,
		scale: 2,
		src: static_url +'marker-15.svg' //source: 'https://www.mapbox.com/maki-icons/'
	  }))
	});
	var vectorLayer_allpubs = new ol.layer.Vector({
	  source: vectorSource_allpubs,
	  style: iconStyle_allpubs,
	  title: 'all pubs'
	});
	
	map.addLayer(vectorLayer_allpubs);
	vectorLayer_allpubs.setVisible(false);

} 	else {
		console.log('no data in allpubs. check views.py');
}


//Twitter
if(tw_Data) {
	tw_Data = tw_Data.replaceAll("'{", "{");
	tw_Data = tw_Data.replaceAll("}'", "}");
	tw_Data = tw_Data.replaceAll("\\\\u00e4", "ae");
	tw_Data = tw_Data.replace(/\\/g, "");
	var obj_tw = JSON.parse(tw_Data);
	
	for(var key in obj_tw){
		if (obj_tw.hasOwnProperty(key)){
			var value=obj_tw[key];
			// work with key and value
		}
	}
	
	var markerFeatures_tw=[];
	
	for ( var i=0; i < obj_tw.length; ++i )	{
		var markerFeature = new ol.Feature({type: 'click', geometry: new ol.geom.Point(obj_tw[i].geometry.coordinates), content: {"source" : "twitter",
		"username" : obj_tw[i].properties.user.screen_name}});
		markerFeatures_tw.push(markerFeature);

	}
	
	var vectorSource_tw = new ol.source.Vector({
	  features: markerFeatures_tw //add an array of features
	});
	
	var iconStyle_tw = new ol.style.Style({
	  image: new ol.style.Icon( ({
		anchor: [0.5, 0.5],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		opacity: 1,
		scale: 2,
		src: static_url + 'marker-tw.svg' //source: 'https://www.mapbox.com/maki-icons/'
		

	  })),
	});
	
	var vectorLayer_tw = new ol.layer.Vector({
	  source: vectorSource_tw,
	  style: iconStyle_tw,
	  title: 'twitter'
	});
	vectorLayer_tw.setVisible(false);
	
	map.addLayer(vectorLayer_tw);
	
} else {
	console.log('no data from twitter. check views.py');
}

//Facebook
if(fb_Data){
	fb_Data = fb_Data.replaceAll("'{", "{");
	fb_Data = fb_Data.replaceAll("}'", "}");
	fb_Data = fb_Data.replaceAll("\\\\u00e4", "ae");
	fb_Data = fb_Data.replace(/\\/g, "");
	
	var obj_fb = JSON.parse(fb_Data);
	
	for(var key in obj_fb){
		if (obj_fb.hasOwnProperty(key)){
			var value=obj_fb[key];
			// work with key and value
		}
	}
	
	var markerFeatures_fb=[];
	
	for ( var i=0; i < obj_fb.length; ++i )
	{
		var markerFeature = new ol.Feature({type: 'click', geometry: new ol.geom.Point(obj_fb[i].geometry.coordinates), content: {"source" : "facebook", 
		"name" : obj_fb[i].properties.name }});
		markerFeatures_fb.push(markerFeature);
	}
	
	
	var vectorSource_fb = new ol.source.Vector({
	  features: markerFeatures_fb //add an array of features
	});
	
	var iconStyle_fb = new ol.style.Style({
	  image: new ol.style.Icon( ({
		anchor: [0.5, 0.5],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		opacity: 1,
		scale: 2,
		src: static_url +'marker-fb.svg' //source: 'https://www.mapbox.com/maki-icons/'
		
	  }))
	});
	
	var vectorLayer_fb = new ol.layer.Vector({
	  source: vectorSource_fb,
	  style: iconStyle_fb,
	  title: 'facebook'
	});
	
	map.addLayer(vectorLayer_fb);
	
} else {
	console.log('no data from facebook. check views.py');
}


//Foursquare
if(fs_Data){
	
	fs_Data = fs_Data.replaceAll("'{", "{");
	fs_Data = fs_Data.replaceAll("}'", "}");
	fs_Data = fs_Data.replaceAll("\\\\u00e4", "ae");
	fs_Data = fs_Data.replace(/\\/g, "");
	
	var obj_fs = JSON.parse(fs_Data);
	
	for(var key in obj_fs){
		if (obj_fs.hasOwnProperty(key)){
			var value=obj_fs[key];
			// work with key and value
		}
	}
	var markerFeatures_fs=[];
	
	for ( var i=0; i < obj_fs.length; ++i )
	{
		var markerFeature = new ol.Feature({type: 'click', geometry: new ol.geom.Point(obj_fs[i].geometry.coordinates), content: {"source" : "foursquare", 
		"name" : obj_fs[i].properties.name , "rating": obj_fs[i].properties.rating }});
		markerFeatures_fs.push(markerFeature);
	}
	
	var vectorSource_fs = new ol.source.Vector({
	  features: markerFeatures_fs //add an array of features
	});
	
	var iconStyle_fs = new ol.style.Style({
	  image: new ol.style.Icon( ({
		anchor: [0.5, 0.5],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
		opacity: 1,
		scale: 2,
		src: static_url +'marker-fs2.svg' //source: 'https://www.mapbox.com/maki-icons/'
	  }))
	});
	
	var vectorLayer_fs = new ol.layer.Vector({
	  source: vectorSource_fs,
	  style: iconStyle_fs,
	  title: 'foursquare'
	});
	
	map.addLayer(vectorLayer_fs);
	
} else {
	console.log('no data from foursquare. check views.py');
}


//OSM
if(osm_Data){
	//Removes ' from the Python-Data, so it can be recognized as JSON by JavaScript
	osm_Data = osm_Data.replaceAll("'{", "{");
	osm_Data = osm_Data.replaceAll("}'", "}");
	osm_Data = osm_Data.replaceAll("\\\\u00e4", "ae");
	osm_Data = osm_Data.replace(/\\/g, "");
	osm_Data = unicodeToChar(osm_Data);
	
	//Transforms the Python-Data to JavaScript-Objects
	var obj_osm = JSON.parse(osm_Data);

	//Transform the Objects to dictionaries
	for(var key in obj_osm){
		if (obj_osm.hasOwnProperty(key)){
			var value=obj_osm[key];
			// work with key and value
		}
	}

	//Transform the data to Feature-Lists
	var markerFeatures_osm=[];
	for ( var i=0; i < obj_osm.length; ++i )
	{
		var markerFeature = new ol.Feature({type: 'click', geometry: new ol.geom.Point(obj_osm[i].geometry.coordinates), content: {"source" : "osm",
		"name" : obj_osm[i].properties.name }});
		markerFeatures_osm.push(markerFeature);
	}
	
	//Transform the Feature-Lists to OpenLayer-Source-Objects
	var vectorSource_osm = new ol.source.Vector({
	  features: markerFeatures_osm //add an array of features
	});
	
	//Specify the Icons for the markers; anchor: [0.5, 0.5] for an exact position of the image;
	var iconStyle_osm = [
		new ol.style.Style({
		  image: new ol.style.Icon( ({
			anchor: [0.5, 0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 1,
			scale: 2,
			src: static_url + 'marker-osm.svg' //source:  'https://www.mapbox.com/maki-icons/'
		  }))
		})
	];
	
	//Create the vectorlayer 
	var vectorLayer_osm = new ol.layer.Vector({
	  source: vectorSource_osm,
	  style: iconStyle_osm,
	  title: 'osm'
	});
	
	//Add the layer to the map
	map.addLayer(vectorLayer_osm);
}


//Smallarea
if(small_Data){
	//Removes ' from the Python-Data, so it can be recognized as JSON by JavaScript
	small_Data = small_Data.replaceAll("'{", "{");
	small_Data = small_Data.replaceAll("}'", "}");
	small_Data = small_Data.replaceAll("\\\\u00e4", "ae");
	small_Data = small_Data.replace(/\\/g, "");
	small_Data = unicodeToChar(small_Data);
	
	//Transforms the Python-Data to JavaScript-Objects
	var obj_small = JSON.parse(small_Data);

	//Transform the Objects to dictionaries
	for(var key in obj_small){
		if (obj_small.hasOwnProperty(key)){
			var value=obj_small[key];
			// work with key and value
		}
	}

	//Transform the data to Feature-Lists
	var markerFeatures_small=[];
	for ( var i=0; i < obj_small.length; ++i )
	{
		var markerFeature = new ol.Feature({type: 'click', geometry: new ol.geom.Point(obj_small[i].geometry.coordinates), content: {"source" : "smallarea",
		"name" : obj_small[i].properties.name, "tweet_count": obj_small[i].properties.tweet_count }});
		markerFeatures_small.push(markerFeature);
	}
	
	//Transform the Feature-Lists to OpenLayer-Source-Objects
	var vectorSource_small = new ol.source.Vector({
	  features: markerFeatures_small //add an array of features
	});
	
	
	var styleFunction = function(feature, resolution) {

	  var content = feature.get('content');
	  var tweet_count = content.tweet_count;
	  var label = tweet_count.toString();
	  var style = [
				new ol.style.Style({
					image: new ol.style.Icon({
					anchor: [0.5, 0.5],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					opacity: 1,
					scale: 2,
					src: static_url + 'marker-15.svg' //source:  'https://www.mapbox.com/maki-icons/'
					})
				}),
				new ol.style.Style({
					text: new ol.style.Text({
						text: label,
						offsetY: 10,
						fill: new ol.style.Fill({
							color: '#fff'
						})
					})
				})
		  ];

	  return style;
	};
	
	
	//Specify the Icons for the markers; anchor: [0.5, 0.5] for an exact position of the image;
	var iconStyle_small = [
		new ol.style.Style({
		  image: new ol.style.Icon( {
			anchor: [0.5, 0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			opacity: 1,
			scale: 2,
			src: static_url + 'marker-15.svg' //source:  'https://www.mapbox.com/maki-icons/'
		  })
		}),
		new ol.style.Style({
			text: new ol.style.Text({
				text: "Wow such label",
				offsetY: -25,
				fill: new ol.style.Fill({
					color: '#fff'
				})
			})
		}),
		new ol.style.Style({
		  image: new ol.style.Circle({
			radius: 50, //0.004476676515355,
			fill: new ol.style.Fill({
			  color: 'rgba(255, 153, 0, 0.4)'
			}),
			stroke: new ol.style.Stroke({
			  color: 'rgba(255, 204, 0, 0.2)',
			  width: 1
			})
		  })
		})
	];
	
	//Create the vectorlayer 
	var vectorLayer_small = new ol.layer.Vector({
	  source: vectorSource_small,
	  style: styleFunction,
	  title: 'small'
	});
	
	//Add the layer to the map
	map.addLayer(vectorLayer_small);
}

//Add the conference layer to the map on top of the others
map.addLayer(vectorLayer_conference);




//POPUP	  
var popup = new ol.Overlay.Popup;

popup.setOffset([0, -55]);

map.addOverlay(popup);

map.on('click', function(evt) {
    var f = map.forEachFeatureAtPixel(
        evt.pixel,
        function(ft, layer){return ft;}
    );

    if (f && f.get('type') == 'click') {
        var geometry = f.getGeometry();
        var coord = geometry.getCoordinates();
		var featurecontent = f.get('content');
		
        var content = featurecontent;
        popup.show(coord, JSON.stringify(content, null, "\t"));

    } else { popup.hide(); }
});

map.on('pointermove', function(e) {
    if (e.dragging) { popup.hide(); return; }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    document.getElementById('map').style.cursor = hit ? 'pointer' : '';
});

//LAYERSWITCHER
var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Legend' // Optional label for button
    });
map.addControl(layerSwitcher); 

}