// var $ = require('jquery');
import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery;
require('jquery-ui');  //what is the difference between import and require
require('jquery.tabulator');


//define some sample data
// var tabledata = [
//     {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
//     {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
//     {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
//     {id:4, name:"Brendon Philips", age:"42", col:"orange", dob:"01/08/1980"},
//     {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
// ];



$("#example-table").tabulator({
    columns:[ //Define Table Columns
        {title: "NDB Number", field:"NDB_Number"},
        {title: "long name", field: "long_name"},
        {title: "data source", field: "data_source"},
        {title: "gtin upc", field: "gtin_upc"},
        {title: "manufacturer", field: "manufacturer"},
        {title:" date modified", field:"date_modified"},
        {title:" date available", field:"date_available"},
        {title:" ingredients english", field:"ingredients_english"}
        
    ]
});

$("#example-table").tabulator("setData", 'http://localhost:5000/list')


//load sample data into the table
// $("#example-table").tabulator("setData", tabledata);