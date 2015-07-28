var Orbit = function () {}

Orbit.prototype.get = function (path, fn) {
  var req = new XMLHttpRequest()
  req.open('GET', path)
  req.send()
  req.addEventListener('load', fn.bind(req))
}

Orbit.prototype.post = function (path, data, fn) {
  var req = new XMLHttpRequest()
  req.open('POST', path)
  req.setRequestHeader('Content-Type', 'application/json')
  req.send(data)
  req.addEventListener('load', fn.bind(req))
}

var fireLocations = new Orbit()
var twitter = new Orbit()

google.maps.event.addDomListener(window, 'load', initialize)

var google
var map

// var infowindow = new google.maps.InfoWindow()



var infowindow = new InfoBox({
     disableAutoPan: false,
     pixelOffset: new google.maps.Size(100, -300),
     zIndex: null,
     boxStyle: {
        background: "rgba(255,255,255, .85)",
        width: "400px",
        height: "500px",
        padding: '16px',
    },
    closeBoxMargin: "0px 0px 16px 16px",
    closeBoxURL: "../images/close.png",
    infoBoxClearance: new google.maps.Size(1, 1),
    isHidden: false,
    pane: "floatPane"
});



function initialize () {
  var myLatlng = new google.maps.LatLng(40.042119, -100.260929)
  var mapOptions = {
    zoom: 5,
    center: myLatlng,
    panControl: false,
    zoomControl: true,
    scrollwheel: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    scaleControl: false,
    mapTypeId: google.maps.MapTypeId.ROAD,
    mapTypeControlOptions: { mapTypeIds: [] },
    styles: [
      {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#E7E7E7'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#CCE4E4'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#ffffff'
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'labels',
        'stylers': [
          { 'visibility': 'simplified' },
          { 'color': '#88acac' }
        ]
      },
      {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [
          { 'visibility': 'on' },
          { 'color': '#949287' }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [
          {
            'color': '#87d9da'
          },
          {
            'visibility': 'on'
          }
        ]
      }
    ]
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions)

}

fireLocations.get('/locations', function () {
  var locations = JSON.parse(this.response)
  var gmarkers = []
  locations.forEach(function (elem) {
    var iconBase = '/images/fire3.png'
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(elem['geo:lat'][0], elem['geo:long'][0]),
      map: map,
      icon: iconBase
    })
    gmarkers.push(marker)
      // console.log(locations)
    google.maps.event.addListener(marker, 'click', function (e) {      // marker.setIcon("/images/fire.png")
    for (var i = 0; i < gmarkers.length; i++) {
     gmarkers[i].setIcon('/images/fire3.png');
    }
      this.setIcon("/images/fire2.png")
      var content = ''
      map.setCenter(marker.getPosition())
      twitter.post('/tweets', JSON.stringify(elem), function () {
        var tweetObj = JSON.parse(this.response)
        var tweets = tweetObj.statuses
        if (tweets.length === 0) {
          infowindow.setContent('<div class="arrow"></div><h2>' + elem.title + '</h2><p class="description"><strong>Description: </strong>' + elem.description[0].substring(0,240) + '...<a href=' + elem.link[0] + ' target="_blank"> Read More</a></p><h3>Recent Tweets</h3><div class="box"><h4>Sorry, there are no tweets on this fire</h4></div>')
        } else {
          tweets.forEach(function (el) {

            content += '<h4>' + el.text + '</h4>'
          })
          infowindow.setContent('<div class="arrow"></div><h2>' + elem.title + '</h2><p class="description"><strong>Description: </strong>' + elem.description[0].substring(0,240) + '...<a href=' + elem.link[0] + ' target="_blank"> Read More</a></p><h3>Recent Tweets</h3><div class="box">' + content + '</div>')
        }
      })
      infowindow.setContent('')
      infowindow.open(map, this)
    })
  })
})

function moveMap () {
  map.panBy(0, -200)
}



google.maps.event.addDomListener(window, 'load', initialize)
