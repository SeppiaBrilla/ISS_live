
var lat = 0;
var lon = 0;
var marker;
var mymap;


var myIcon = L.icon({
    iconUrl:'icon.png',
    iconSize:[38,94],
    iconAnchor:[19,47]
});

$(document).ready(function(){
    mymap = L.map('mymap').setView([0, 0], 1.5);
    const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    marker = L.marker([lat, lon], {icon: myIcon}).addTo(mymap);
    updatePosition();
    setInterval(updatePosition,1000);
});


function updatePosition(){
    $.ajax({
        type:'GET',
        url:'https://api.wheretheiss.at/v1/satellites/25544',
        success: function(Data){
            lat = Data.latitude;
            lon = Data.longitude;
            marker.setLatLng([lat, lon]);
            mymap.setView([lat, lon]);
        }
    });
}