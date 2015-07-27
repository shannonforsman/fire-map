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
     pixelOffset: new google.maps.Size(10, -300),
     zIndex: null,
     boxStyle: {
        background: "rgba(255,255,255, .85)",
        width: "400px",
        height: "416px",
        overflowX: 'visible',
        overflowY: 'scroll',
        padding: '16px'
    },
    closeBoxMargin: "0px 0px 16px 16px",
    closeBoxURL: "../images/close.png",
    infoBoxClearance: new google.maps.Size(1, 1)
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
  locations.forEach(function (el) {
    var iconBase = '/images/fire.svg'
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(el['geo:lat'][0], el['geo:long'][0]),
      map: map,
      icon: iconBase
    })
    google.maps.event.addListener(marker, 'click', function () {
      var content = ''
      map.setCenter(marker.getPosition())
      twitter.post('/tweets', JSON.stringify(el), function () {
        var tweetObj = JSON.parse(this.response)
        var tweets = tweetObj.statuses
        if (tweets.length === 0) {
          infowindow.setContent('Sorry, there are no tweets on this fire')
        } else {
          tweets.forEach(function (el) {
            if (el.entities.urls.length > 0) {
                content += '<h3>' + el.text + ' <a href=' + el.entities.urls[0].expanded_url + ' target="_blank">Go to link</a></h3>'

            } else {
              content += '<h3>' + el.text + '</h3>'
            }

          })
          infowindow.setContent('<div class="arrow"></div><div class="box"><h2>' + el.title + '</h2>' + content + '</div>')
        }
      })
      infowindow.setContent('')
      infowindow.open(map, this)
      console.log(infowindow)
    })
  })
})

function moveMap () {
  map.panBy(0, -200)
}

google.maps.event.addDomListener(window, 'load', initialize)
