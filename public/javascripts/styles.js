var infoBoxStyle = {
  background: 'rgba(255,255,255, .85)',
  width: '400px',
  height: '550px',
  padding: '16px',
  windowWidth: function() {
    if (window.innerWidth < 450) {
      this.position = 'relative'
      this.width = '80%'
      this.marginTop = '250px'
    } else if (window.innerWidth < 900) {
      this.bottom = '0'
      this.height = '150px'
    } else if (window.innerWidth < 900) {
      this.width = '300px'
      this.height = '200px'
      this.marginLeft = '-50px'
    } else if (window.innerWidth < 1160) {
      this.marginTop = '-100px'
      this.height = '500px'
      this.marginLeft = '-50px'
    }
  }
}

infoBoxStyle.windowWidth()


var mapStyles = [
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
