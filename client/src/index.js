// var $ = require('jquery');
import {MyMap} from './js/map'
import jquery from 'jquery';
import mapboxgl from 'mapbox-gl';
window.jQuery = jquery;
window.$ = jquery;
require('jquery-ui');  //what is the difference between import and require
require('jquery.tabulator');


function flattenData(data){
    var output = [];
    function flattenRow(row){
        var outputRow = {};
        for(var prop in row){
            if(typeof row[prop] !== "object"){
                outputRow[prop] = row[prop];
            }
            else{
                var flat = flattenData(row[prop]);
                console.log(flat)
                for(var flatProp in flat){
                    outputRow[prop] = flat[flatProp];
                }
            }
        }
        return outputRow;
    }
    data.forEach(function(row){
        output.push(flattenRow(row));
    });
    console.log(output)
    return output;
}


$("#example-table").tabulator({
    height: 500,
    layout:"fitColumns",
    ajaxURL: 'http://localhost:5000/list',
    columns:[ //Define Table Columns
        {title: "Station Name", field:"name",},
        {title: "line", field: "lines"},
        {title: "lat", field: "lat"},
        {title: "lon", field: "lon"},
    ],
    initialSort: [
        {column: "name", dir: "asc"}
    ],
    responsiveLayout:"collapse",
    rowClick:function(e, row){ 
        var popup = new mapboxgl.Popup({closeOnClick: false})
            .setLngLat([row.getData().lon, row.getData().lat])
            .setHTML(row.getData().name)
            .addTo(map);
    },
    ajaxResponse:function(url, params, response){
        //url - the URL of the request
        //params - the parameters passed with the request
        //response - the JSON object returned in the body of the response.
        return flattenData(response); //return the tableData peroperty of a response json object
    },
});


if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
}

function HelloWorldControl() { }

HelloWorldControl.prototype.onAdd = function(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl';
    this._container.textContent = 'Hello, world';
    return this._container;
};

HelloWorldControl.prototype.onRemove = function () {
     this._container.parentNode.removeChild(this._container);
     this._map = undefined;
};

mapboxgl.accessToken = 'pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjamwzdDdseXcyNTk5M3Fuc3p2ZzJmdXdlIn0.cjtHea9XjbVzu7IQDIXsog';
const map = new mapboxgl.Map({
    container: 'mapbox',
    center: [-74.50, 40],
    zoom: 9,
    style: 'mapbox://styles/rmguarachi/cjlb7kbx22pps2rp13pnf9yz5',
    trackResize: true,
    hash:true,
    logoPosition: 'top-right',
});

map.on('mousemove', function (e) {
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat);
});


map.addControl(new mapboxgl.NavigationControl());

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

map.addControl(new mapboxgl.FullscreenControl());



var geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Foo",
                "iconSize": [60, 60]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -66.324462890625,
                    -16.024695711685304
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Bar",
                "iconSize": [50, 50]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -61.2158203125,
                    -15.97189158092897
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Baz",
                "iconSize": [40, 40]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -63.29223632812499,
                    -18.28151823530889
                ]
            }
        }
    ]
};



geojson.features.forEach(function(marker, position) {
    // create a DOM element for the marker
    let el = document.createElement('div');
    let elText = document.createElement('h1');
    elText.innerHTML = "test" + position;
    el.appendChild(elText);
    el.className = 'marker';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    el.addEventListener('click', function() {
        window.alert(marker.properties.message);
    });

    // add marker to map
    new mapboxgl.Marker({
        element: el,
        draggable: true,
    })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});


map.on('load', function () {

    map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [-122.48369693756104, 37.83381888486939],
                        [-122.48348236083984, 37.83317489144141],
                        [-122.48339653015138, 37.83270036637107],
                        [-122.48356819152832, 37.832056363179625],
                        [-122.48404026031496, 37.83114119107971],
                        [-122.48404026031496, 37.83049717427869],
                        [-122.48348236083984, 37.829920943955045],
                        [-122.48356819152832, 37.82954808664175],
                        [-122.48507022857666, 37.82944639795659],
                        [-122.48610019683838, 37.82880236636284],
                        [-122.48695850372314, 37.82931081282506],
                        [-122.48700141906738, 37.83080223556934],
                        [-122.48751640319824, 37.83168351665737],
                        [-122.48803138732912, 37.832158048267786],
                        [-122.48888969421387, 37.83297152392784],
                        [-122.48987674713133, 37.83263257682617],
                        [-122.49043464660643, 37.832937629287755],
                        [-122.49125003814696, 37.832429207817725],
                        [-122.49163627624512, 37.832564787218985],
                        [-122.49223709106445, 37.83337825839438],
                        [-122.49378204345702, 37.83368330777276]
                    ]
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 8
        }
    });


    map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [[[-67.13734351262877, 45.137451890638886],
                        [-66.96466, 44.8097],
                        [-68.03252, 44.3252],
                        [-69.06, 43.98],
                        [-70.11617, 43.68405],
                        [-70.64573401557249, 43.090083319667144],
                        [-70.75102474636725, 43.08003225358635],
                        [-70.79761105007827, 43.21973948828747],
                        [-70.98176001655037, 43.36789581966826],
                        [-70.94416541205806, 43.46633942318431],
                        [-71.08482, 45.3052400000002],
                        [-70.6600225491012, 45.46022288673396],
                        [-70.30495378282376, 45.914794623389355],
                        [-70.00014034695016, 46.69317088478567],
                        [-69.23708614772835, 47.44777598732787],
                        [-68.90478084987546, 47.184794623394396],
                        [-68.23430497910454, 47.35462921812177],
                        [-67.79035274928509, 47.066248887716995],
                        [-67.79141211614706, 45.702585354182816],
                        [-67.13734351262877, 45.137451890638886]]]
                }
            }
        },
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    });
});
