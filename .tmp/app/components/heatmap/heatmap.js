
(function () {
  angular
  .module('app')
  .component('heatmap', {
    templateUrl: 'app/components/heatmap/heatmap.html',
    controller: heatmapController
  });

  var geo = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAJ5NvGs4ZiA7SIu9WPxnP0tKYT1aHlOXo&address=';

  function heatmapController($window, $scope, $http) {
    $window.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 40.759715,
        lng: -98.807937
      },
      disableDoubleClickZoom: true,
      zoomControl: false,
      zoom: 4,
      maxZoom: 5,
      minZoom: 4,
      draggable: false,
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

    var coordinates = [
      new google.maps.LatLng(39.77745056152344, -86.10900878906250),
      new google.maps.LatLng(39.82060623168945, -86.17008972167969),
      new google.maps.LatLng(39.77947616577148, -86.17008972167969),
      new google.maps.LatLng(39.82987594604492, -86.13955688476562),
      new google.maps.LatLng(39.74195098876953, -86.12429046630860)
    ];

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: coordinates,
      map: $window.map,
      gradient: getGradient(),
      radius: 30
    });

    // var Url   = "../../../data/convertcsv.json";
    // $http.get(Url).then(function(response){
    //   response.data.forEach(function(value) {
    //     if (value.FIELD2 !== 'CITY NAME') {
    //       var item = $http.get(geo + value.FIELD2).then(function(resp){
    //         var lng = resp.data.results[0].geometry.location.lng;
    //         var lat = resp.data.results[0].geometry.location.lat;
    //         console.log(lng + ", " + lat + ", " + resp.data.results[0].address_components.long_name);
    //       });
    //     }
    //   });
    // });
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
            "color": "#46bcec"
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
