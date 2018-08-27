// var $ = require('jquery');
import {MyMap} from './js/map'
import jquery from 'jquery';
import mapboxgl from 'mapbox-gl';
window.jQuery = jquery;
window.$ = jquery;
require('jquery-ui');  //what is the difference between import and require
require('jquery.tabulator');


// var editCheck = function(cell) {
//     var data = cell.getRow().getData();
//     return data['NDB_Number'] < 45001697;
// }

// $("#example-table").tabulator({
//     layout:"fitDataFill",
//     ajaxURL: 'http://localhost:5000/list',
//     columns:[ //Define Table Columns
//         {formatter:"responsiveCollapse", headerSort:false},
//         {title: "NDB Number", field:"NDB_Number",},
//         {title: "long name", field: "long_name", headerFilter:true},
//         {title: "data source", field: "data_source", visible: false},
//         {title: "gtin upc", field: "gtin_upc", visible: false},
//         {title: "manufacturer", field: "manufacturer", editor:"input", editable:editCheck, validator:"required"},
//         {title:" date modified", field:"date_modified", visible:false},
//         {title:" date available", field:"date_available", visible:false},
//         {title:" ingredients english", field:"ingredients_english", variableHeight: true}
        
//     ],
//     index: "NDB_Number",
//     tooltips:true,
//     initialSort: [
//         {column: "NDB_Number", dir: "desc"}
//     ],
//     responsiveLayout:"collapse",
//     responsiveLayoutCollapseStartOpen: false,
//     resizableColumns:false

// });


window.map = new MyMap('mapbox', '', 'mapbox://styles/rmguarachi/cjlb7kbx22pps2rp13pnf9yz5');
window.map2 = new MyMap('mapbox2', [-74.50, 40] , 'mapbox://styles/rmguarachi/cjlb7kbx22pps2rp13pnf9yz5');

// mapboxgl.accessToken = 'pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjamwzdDdseXcyNTk5M3Fuc3p2ZzJmdXdlIn0.cjtHea9XjbVzu7IQDIXsog';
//     const map = new mapboxgl.Map({
//         container: 'mapbox',
//         center: [-74.50, 40],
//         zoom: 9,
//         style: 'mapbox://styles/rmguarachi/cjlb7kbx22pps2rp13pnf9yz5',
//         trackResize: true
//     });

//     mapboxgl.accessToken = 'pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjamwzdDdseXcyNTk5M3Fuc3p2ZzJmdXdlIn0.cjtHea9XjbVzu7IQDIXsog';
//     const map2 = new mapboxgl.Map({
//         container: 'mapbox2',
//         center: [-74.50, 40],
//         zoom: 9,
//         style: 'mapbox://styles/rmguarachi/cjl3ujowo4sle2so9nb6k4i0v',
//         trackResize: true
//     });
