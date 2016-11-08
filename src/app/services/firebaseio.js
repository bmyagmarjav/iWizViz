var config = {
  apiKey: "AIzaSyC188Gz-CiFIHxtHTRWq6P6EGgoRXWhs9s",
  authDomain: "iwizviz.firebaseapp.com",
  databaseURL: "https://iwizviz.firebaseio.com",
  storageBucket: "iwizviz.appspot.com"
};

var tables = {
  migratiion: 'Migration Flows Between Regions'
};

var from = {
  Northeast: 'From Northeast',
  Midwest: 'From Midwest',
  South: 'From South',
  West: 'From West'
};

firebase.initializeApp(config);

function Firebaseio() {
  this.root = firebase.database().ref();
  this.migration = this.root.child(tables.migratiion);
}

Firebaseio.prototype = {
  getTotalGains: function (year, cb) {
    this.migration.child(year).once('value', function (snapshot) {
      var west = south = midwest = northeast = 0;

      Object.values(from).forEach(function (key) {
        var json = snapshot.val()[key];
        if (key !== from.West) {
          west += parseInt(json.West.Type1.Total, 10);
        }
        if (key !== from.South) {
          south += parseInt(json.South.Type1.Total, 10);
        }
        if (key !== from.Midwest) {
          midwest += parseInt(json[' Midwest'].Type1.Total, 10);
        }
        if (key !== from.Northeast) {
          northeast += parseInt(json.Northeast.Type1.Total, 10);
        }
      });
      set(northeast, midwest, south, west);
      cb(null, get());
    }, function (error) {
      cb(error, null);
    });
  }
};

function set(n, m, s, w) {
  this.value =
    [{region: 'Northeast',
      total: n,
      coordinate: {lat: 42.081053, long: -75.398449}
    },
    {region: 'Midwest',
      total: m,
      coordinate: {lat: 43.011554, long: -92.065715}
    },
    {region: 'South',
      total: s,
      coordinate: {lat: 33.238441, long: -89.458384}
    },
    {region: 'West',
      total: w,
      coordinate: {lat: 37.076979, long: -107.250398}
    }];
}

function get() {
  return this.value;
}
