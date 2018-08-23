// var $ = require('jquery');
import jquery from 'jquery';
import mapboxgl from 'mapbox-gl';
window.jQuery = jquery;
window.$ = jquery;
require('jquery-ui');  //what is the difference between import and require
require('jquery.tabulator');


var editCheck = function(cell) {
    var data = cell.getRow().getData();
    return data['NDB_Number'] < 45001697;
}

$("#example-table").tabulator({
    layout:"fitDataFill",
    ajaxURL: 'http://localhost:5000/list',
    columns:[ //Define Table Columns
        {formatter:"responsiveCollapse", headerSort:false},
        {title: "NDB Number", field:"NDB_Number",},
        {title: "long name", field: "long_name", headerFilter:true},
        {title: "data source", field: "data_source", visible: false},
        {title: "gtin upc", field: "gtin_upc", visible: false},
        {title: "manufacturer", field: "manufacturer", editor:"input", editable:editCheck, validator:"required"},
        {title:" date modified", field:"date_modified", visible:false},
        {title:" date available", field:"date_available", visible:false},
        {title:" ingredients english", field:"ingredients_english", variableHeight: true}
        
    ],
    index: "NDB_Number",
    tooltips:true,
    initialSort: [
        {column: "NDB_Number", dir: "desc"}
    ],
    responsiveLayout:"collapse",
    responsiveLayoutCollapseStartOpen: false,
    resizableColumns:false

});

function loadMap(lat, lon) {
    console.log(lat, lon)
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjamwzdDdseXcyNTk5M3Fuc3p2ZzJmdXdlIn0.cjtHea9XjbVzu7IQDIXsog';
    const map = new mapboxgl.Map({
        container: 'mapbox-map',
        center: [lon, lat],
        zoom: 9,
        style: 'mapbox://styles/rmguarachi/cjl3ujowo4sle2so9nb6k4i0v',
        trackResize: true
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-left');


    let geoTracker = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true
    });
    map.addControl(geoTracker);


    map.addControl(new mapboxgl.AttributionControl({
        compact: true
    }));

    map.on('load', function() {
     map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-73.87118099999999, 40.7419493 ]
                    },
                    "properties": {
                        "title": "Home",
                        "icon": "circle-stroked"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-122.414, 37.776]
                    },
                    "properties": {
                        "title": "Mapbox SF",
                        "icon": "harbor"
                    }
                }]
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
        }
    });
});
}


if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
        loadMap(position.coords.latitude, position.coords.longitude);
        console.log("loading");
    });
} else {
  /* geolocation IS NOT available */
  console.log("geolocation not available");
  loadMap(-74.50, 40);
}
