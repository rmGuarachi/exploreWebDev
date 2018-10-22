// var $ = require('jquery');
import {MyMap} from './js/map'
import jquery from 'jquery';
import mapboxgl from 'mapbox-gl';
import cytoscape from 'cytoscape';

var subway_lines = require('./dataset/subway_lines');
var airport_polygons = require('./dataset/airport')

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
    'S': '808183',
    '1': 'EE352E',
    '2': 'EE352E',
    '3': 'EE352E',
    '4': '00933C',
    '5': '00933C',
    '6': '00933C',
    '7': 'B933AD',
    'ALL': 'fa8072'
}

const trains = [
    1, 2, 3, 4, 5, 6, 7, 
    'A', 'B', 'C', 'D', 'E', 
    'F', 'G', 'J', 'L', 'M', 
    'N', 'Q', 'R', 'S', 
    'ALL'
];


function format_subway_lines(subway_lines){
    let features = []
    let data_fea = subway_lines['subway_lines']['features'];
    console.log(data_fea);
    for (let i=0; i < data_fea.length; i++){
        features.push({
          "type": "Feature",
          "geometry": data_fea[i]['geometry'],
        })
    }

    subway_lines['features'] = features;
    console.log(subway_lines);
    return subway_lines['subway_lines'];
}

function subway_button_event(e){
    let subway_line = e.target.getAttribute('data-subway');
    if (subway_line === 'ALL'){
        subway_line = trains.slice(0, trains.length-1);
    }
    else {
        subway_line = [subway_line];
    }


    for (let i=0; i < subway_line.length; i++){
        const cur_line = subway_line[i]
        const source_name = "subway_stations_src" + subway_line[i];
        const layer_id = "subway_stations_layer" + subway_line[i];
        if(map.getSource(source_name) !== undefined){
            // TODO FIX when a subway line is stations is displayed and then all clicked
            var visibility = map.getLayoutProperty(layer_id, 'visibility');
            if (visibility === 'visible') {
                map.setLayoutProperty(layer_id, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(layer_id, 'visibility', 'visible');
            }
        }
        else {
            map.addSource(source_name, {
                "type": "geojson",
                "data": "http://localhost:5000/list/source/" + cur_line
            }); 

            map.addLayer({
                "id": layer_id,
                "type": "symbol",
                "source": source_name,
                "layout": {
                    "text-field": "{title}",
                    "icon-image": "{icon}",
                    "text-size": 10,
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top",
                },
            });
        }
    }
}

const icon_div = $('#subway_line_icon');
for (let i=0; i < trains.length; i++){
    const el = document.createElement('button');
    el.style.backgroundColor = '#' + trains_colors[trains[i]];
    el.classList.add('train-icon');
    el.setAttribute('data-subway', trains[i]);
    el.innerHTML = trains[i];
    el.onclick = subway_button_event;
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


console.log(airport_polygons['airports']);

map.on('load', function(){ 

  map.addLayer({
    "id": "airport_polygons",
    "type": "fill",
    "source": {
      "type": "geojson",
      "data": airport_polygons['airports'],
    },
    'layout': {},
      'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  });

  map.addLayer({
        "id": "LineString",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": subway_lines['subway_lines']
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#FF0000",
            "line-width": 5
        }
    });
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

cytoscape({
  container: document.getElementById('cy'),

  layout: {
    name: 'cose',
    padding: 2
  },

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'background-fit': 'cover', 
        'background-position': 'center', 
        'border-radius': '0',
        color: 'black',
        shape: 'rectangle',
      })
    .selector('.capacitor-symbol')
        .css({
            'background-image': '/assets/singleline/capacitor-symbol.png'
        })
    .selector('.battery-symbol')
        .css({
            'background-image': '/assets/singleline/battery-symbol.png'
        })
    .selector('.current-transformer-symbol')
        .css({
            'background-image': '/assets/singleline/current-transformer-symbol.png'
        })
    .selector('.disconnect-switch-symbol')
        .css({
            'background-image': '/assets/singleline/disconnect-switch-symbol.png'
        })
    .selector('.emergency-generator-symbol')
        .css({
            'background-image': '/assets/singleline/emergency-generator-symbol.png'
        }), 

  elements: {
    nodes: [
      { data: { id: 'j', name: 'Jerry', weight: 80, faveColor: '#6FB1FC'}, classes: 'capacitor-symbol'},
      { data: { id: 'e', name: 'Elaine', weight: 45, faveColor: '#EDA1ED'}, classes: 'emergency-generator-symbol' },
      { data: { id: 'k', name: 'Kramer', weight: 75, faveColor: '#86B342' } , classes: 'disconnect-switch-symbol'},
      { data: { id: 'g', name: 'George', weight: 70, faveColor: '#F5A45D' } }
    ],
    edges: [
      { data: { source: 'j', target: 'e', faveColor: '#6FB1FC' } },
      { data: { source: 'j', target: 'k', faveColor: '#6FB1FC' } },
      { data: { source: 'j', target: 'g', faveColor: '#6FB1FC' } },

      { data: { source: 'e', target: 'j', faveColor: '#EDA1ED' } },
      { data: { source: 'e', target: 'k', faveColor: '#EDA1ED' }, classes: 'questionable' },

      { data: { source: 'k', target: 'j', faveColor: '#86B342' } },
      { data: { source: 'k', target: 'e', faveColor: '#86B342' } },
      { data: { source: 'k', target: 'g', faveColor: '#86B342' } },

      { data: { source: 'g', target: 'j', faveColor: '#F5A45D' } }
    ]
  },

  ready: function(){
    window.cy = this;
  }
});
