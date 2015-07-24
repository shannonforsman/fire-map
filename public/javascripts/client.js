var Orbit = function () {}

Orbit.prototype.get = function (path, fn) {
  var req = new XMLHttpRequest()
  req.open('GET', path)
  req.send()
  req.addEventListener('load', fn.bind(req))
}

var fireLocations = new Orbit()

google.maps.event.addDomListener(window, 'load', initialize)

var google
var infoWindowContent
var map

var infowindow = new google.maps.InfoWindow({
  content: infoWindowContent
})


function initialize () {
  var myLatlng = new google.maps.LatLng(40.042119, -100.260929)
  var mapOptions = {
    zoom: 5,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROAD
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)

}


fireLocations.get('/locations', function () {
  var locations = JSON.parse(this.response)
  locations.forEach(function (el) {

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(el['geo:lat'][0], el['geo:long'][0]),
      map: map
    })
    google.maps.event.addListener(marker, 'click', function () {
      
      infowindow.setContent('Marker position: ' + this.getPosition());
      infowindow.open(map, this);
    })
  })
})


google.maps.event.addDomListener(window, 'load', initialize)
