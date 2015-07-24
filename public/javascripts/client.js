var Orbit = function () {}

Orbit.prototype.get = function (path, fn) {
  var req = new XMLHttpRequest()
  req.open('GET', path)
  req.send()
  req.addEventListener('load', fn.bind(req))
}

var fireLocations = new Orbit()

var google

google.maps.event.addDomListener(window, 'load', initialize)

var map

function initialize () {
  var myLatlng = new google.maps.LatLng(40.042119, -100.260929)
  var mapOptions = {
    zoom: 5,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROAD
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)

}

// Create our info window content
var infoWindowContent = '<div class="info_content">' +
  '<h3>Title</h3>' +
  '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +
  '</div>'

var infowindow = new google.maps.InfoWindow({
  content: infoWindowContent
})

fireLocations.get('/locations', function () {
  console.log(map)
  var locations = JSON.parse(this.response)
  var marker
  locations.forEach(function (el) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(el['geo:lat'][0], el['geo:long'][0]),
      map: map
    })
    console.log(el)
  })
})

google.maps.event.addListener(marker, 'click', function () {
  infowindow.open(map, marker)
})

google.maps.event.addDomListener(window, 'load', initialize)
