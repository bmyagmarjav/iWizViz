var config = {
  apiKey: "AIzaSyC188Gz-CiFIHxtHTRWq6P6EGgoRXWhs9s",
  authDomain: "iwizviz.firebaseapp.com",
  databaseURL: "https://iwizviz.firebaseio.com",
  storageBucket: "iwizviz.appspot.com"
};

var tables = {
  migratiion: 'Migration Flows Between Regions',
  states: 'states',
  reasons: 'Reason for Move'
};

var from = {
  Northeast: 'From Northeast',
  Midwest: 'From Midwest',
  South: 'From South',
  West: 'From West'
};

var rev = {
  'From Northeast': 'Northeast',
  'From Midwest': 'Midwest',
  'From South': 'South',
  'From West': 'West'
};

var to = {
  Northeast: 'Northeast',
  Midwest: ' Midwest',
  South: 'South',
  West: 'West'
};

function createLink(s, t, v) {
  return {
    source: s,
    target: t,
    value: v
  };
}

function dict(key, value) {
  return {[key]: value};
}

firebase.initializeApp(config);

function Firebaseio() {
  this.root = firebase.database().ref();
  this.migration = this.root.child(tables.migratiion);
  this.states = this.root.child(tables.states);
  this.reasons = this.root.child(tables.reasons);
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
      var data = snapshot.val();
      var object = [];
      Object.keys(to).forEach(function (vk) {
        var each = [];
        Object.keys(data).forEach(function (key) {
          var region = data[key][to[vk]];
          if (region !== undefined) {
            each.push(dict(key, region.Type1.Total));
          }
        });
        each.push(vk);
        object.push(each);
      });

      set(northeast, midwest, south, west, object);
      cb(null, get());
    }, function (error) {
      cb(error, null);
    });
  },
  // states reference to call all states coordinates GeoJSON
  getUsaStates: function (cb) {
    this.states.once('value', function (snapshot) {
      cb(null, snapshot.val().features);
    }, function (error) {
      cb(error, null);
    });
  },
  // read migration
  getNodesAndLinks: function (year, cb) {
    this.migration.child(year).once('value', function (snapshot) {
      var nodes = [];
      var links = [];

      Object.keys(from).forEach(function (key) {
        nodes.push({name: key});
        var data = snapshot.val()[from[key]];
        Object.keys(data).forEach(function (region) {
          links.push(createLink(from[key], region, data[region].Type1.Total));
        });
      });
      Object.values(from).forEach(function (value) {
        nodes.push({name: value});
      });
      cb(null, nodes, links);
    }, function (error) {
      cb(error, null, null);
    });
  },
  // read reasons
  getReasons: function (year, cb) {
    this.reasons.child(year).once('value', function (snapshot) {
      cb(null, snapshot.val());
    }, function (error) {
      cb(error, null);
    });
  }
};
// setter method which takes arguments of total number migration of each states
function set(n, m, s, w, arr) {
  this.value =
    [{region: 'Northeast',
      total: n,
      coordinate: {lat: 42.081053, long: -75.398449},
      index: 0,
      Midwest: 0,
      South: 0,
      West: 0
    },
    {region: 'Midwest',
      total: m,
      coordinate: {lat: 43.011554, long: -92.065715},
      index: 1,
      Northeast: 0,
      South: 0,
      West: 0
    },
    {region: 'South',
      total: s,
      coordinate: {lat: 33.238441, long: -89.458384},
      index: 2,
      Midwest: 0,
      Northeast: 0,
      West: 0
    },
    {region: 'West',
      total: w,
      coordinate: {lat: 37.076979, long: -107.250398},
      index: 3,
      Midwest: 0,
      Northeast: 0,
      South: 0
    }];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < 4; j++) {
      Object.keys(arr[i][j]).forEach(function (key) {
        if (rev[key] !== undefined) {
          value[i][rev[key]] = arr[i][j][key];
        }
      });
    }
  }
}
// get object which contains total number of each states migration
function get() {
  return this.value;
}
