
(function () {
  'use strict'
  angular
  .module('app')
  .component('heatmap', {
    templateUrl: 'app/components/heatmap/heatmap.html',
    controller: heatmapController
  });

  var geo = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAJ5NvGs4ZiA7SIu9WPxnP0tKYT1aHlOXo&address=';

  function heatmapController($window, $scope, $http, Firebaseio) {
    $window.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 40.759715,
        lng: -98.807937
      },
      disableDoubleClickZoom: true,
      zoomControl: false,
      zoom: 5,
      maxZoom: 5,
      minZoom: 3,
      // draggable: false,
      mapTypeControl: false
    });

    // style it
    var style = new google.maps.StyledMapType(getStyleData(), {name: "Styled Map"});
    $window.map.mapTypes.set('map_style', style);
    $window.map.setMapTypeId('map_style');

    // make it responsive
    google.maps.event.addDomListener($window, "resize", function() {
      var center = $window.map.getCenter();
      google.maps.event.trigger($window.map, "resize");
      $window.map.setCenter(center);
    });

    var coordinates = [];
    Firebaseio.getPopulation(function(error, data) {
      if (error) {
        throw error;
      }
      data.forEach(function(val) {
        var marker = new google.maps.Marker({
          position: {
            lat: val.lat,
            lng: val.long
          },
          icon: '../../../img/pin.png',
          map: $window.map,
          animation: google.maps.Animation.DROP
        });

        coordinates.push({
          location: new google.maps.LatLng(val.lat, val.long),
          weight: val[2015]
        });
      });

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: coordinates,
        map: $window.map,
        gradient: getGradient(),
        radius: 50
      });
    });
  }

  function getStyleData() {
    return [
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#444444"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#70DCDC"
          },
          {
            "visibility": "on"
          }
        ]
      }
    ];
  }

  function getGradient() {
    return [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];
  }
})();
