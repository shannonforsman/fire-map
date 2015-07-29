var infoBoxStyle = {
  background: 'rgba(255,255,255, .85)',
  width: '400px',
  height: '500px',
  padding: '16px',
}

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
