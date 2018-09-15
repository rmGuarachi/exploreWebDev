// var $ = require('jquery');
import {MyMap} from './js/map'
import jquery from 'jquery';
import mapboxgl from 'mapbox-gl';
window.jQuery = jquery;
window.$ = jquery;
require('jquery-ui');  //what is the difference between import and require
require('jquery.tabulator');


const trains_colors = {
    'A': '0039A6',
    'C': '0039A6',
    'E': '0039A6',
    'B': 'FF6319',
    'D': 'FF6319',
    'F': 'FF6319',
    'M': 'FF6319',
    'G': '6CBE45',
    'J': '996633', 
    'Z': '996633',
    'L': 'A7A9AC',
    'N': 'FCCC0A',
    'Q': 'FCCC0A',
    'R': 'FCCC0A',
    'W': 'FCCC0A',
    'S': '808183',
    '1': 'EE352E',
    '2': 'EE352E',
    '3': 'EE352E',
    '4': '00933C',
    '5': '00933C',
    '6': '00933C',
    '7': 'B933AD'
}

const trains = [
    1, 2, 3, 4, 5, 6, 7, 
    'A', 'B', 'C', 'D', 'E', 
    'F', 'G', 'J', 'L', 'M', 
    'N', 'Q', 'R', 'S', 'W'
];

const icon_div = $('#subway_line_icon');
console.log(icon_div)
for (let i=0; i < trains.length; i++){
    const el = document.createElement('button');
    el.style.color = '#' + trains_colors[trains[i]];
    el.innerHTML = trains[i];
    icon_div.append(el);
}


function flattenData(data){
    for(var i=0; i < data.length; i++){
        var lines = '';
        for(var j=0; j < data[i]['lines'].length; j++){
            lines += data[i]['lines'][j]['id'] + " ";
        }
        data[i]['lines'] = lines;
    }
    return data;
}


$("#example-table").tabulator({
    height: window.innerHeight * .80,
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
        var html = "<strong>" + row.getData().name + "</strong>" + "<br>" + row.getData().lines;

        var popup = new mapboxgl.Popup({closeOnClick: false})
            .setLngLat([row.getData().lon, row.getData().lat])
            .setHTML(html)
            .addTo(map);
    },
    ajaxResponse:function(url, params, response){
        //url - the URL of the request
        //params - the parameters passed with the request
        //response - the JSON object returned in the body of the response.
        console.log(response);
        return flattenData(response); //return the tableData peroperty of a response json object
    },
});


if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
}

mapboxgl.accessToken = 'pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjamwzdDdseXcyNTk5M3Fuc3p2ZzJmdXdlIn0.cjtHea9XjbVzu7IQDIXsog';
const map = new mapboxgl.Map({
    name: 'MTA',
    container: 'mapbox',
    center: [-74.50, 40],
    zoom: 2,
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


map.on('load', function () {

    map.addSource("geojson-marker", {
        "type": "geojson",
        "data": "http://localhost:5000/list/source/1"
    }); 

    map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": "geojson-marker",
        "layout": {
            "text-field": "{title}",
            "icon-image": "{icon}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
        },
    });
});
