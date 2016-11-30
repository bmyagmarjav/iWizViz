var config = {
  apiKey: "AIzaSyC188Gz-CiFIHxtHTRWq6P6EGgoRXWhs9s",
  authDomain: "iwizviz.firebaseapp.com",
  databaseURL: "https://iwizviz.firebaseio.com",
  storageBucket: "iwizviz.appspot.com"
};

var tables = {
  migratiion: 'Migration Flows Between Regions',
  states: 'states',
  reasons: 'Reason for Move',
  population: 'population'
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

var source = {
  'From West': 1,
  'From Northeast': 3,
  'From Midwest': 0,
  'From South': 2
};

var target = {
  'West': 7,
  'Northeast': 5,
  ' Midwest': 4,
  'South': 6
}

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
  this.population = this.root.child(tables.population);
}

Firebaseio.prototype = {
  // migration
  getMigration: function(year, cb) {
    this.migration.child(year).once('value', function (snapshot) {
      cb(null, snapshot.val());
    }, function (error) {
      cb(error, null);
    });
  },
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
  getNodesAndLinks: function (year, demogr, type, cb) {
    this.migration.child(year).once('value', function (snapshot) {
      var nodes = []; //global variables
      var links = []; //global variables - supported by d3
      var data = snapshot.val();
      // console.log(data);
      produceLinksAndNodes(data, nodes, links, demogr, type);
      // produce unique nodes
      nodes = d3.keys(d3.nest().key(function (d) { return d.name; }).map(nodes));
      // replace the text with its index from node
      links.forEach(function (d, i) {
        links[i].source = nodes.indexOf(links[i].source);
        links[i].target = nodes.indexOf(links[i].target);
      });
      // array nodes
      nodes.forEach(function (d, i) {
        nodes[i] = { "name": d };
      });

      cb(null, nodes, links);
    }, function (error) {
      cb(error, null, null);
    });
  },
  // read reasons
  getReasons: function(year, cb) {
    this.reasons.child(year).once('value', function (snapshot) {
      cb(null, snapshot.val());
    }, function (error) {
      cb(error, null);
    });
  },
  // read reasons and process bubble data
  getDataForBubbleGraph: function (year, demogr, cb) {
    this.reasons.child(year).once('value', function (snapshot) {
      var data = [];
      var i = 0;
      var reason = snapshot.val();
      if (demogr === "Default") {
        Object.keys(reason).forEach(function(key){
          console.log(reason[key]["Total"]);
          data.push({
            index: i++,
            value: reason[key]["Total"]
          });
        });
      } else {
        Object.keys(reason).forEach(function(key){
          Object.values(reason[key][demogr]).forEach(function(val) {
            data.push({
              index: i++,
              value: val
            });
          });
        });
      }
      cb(null, data);
    }, function (error) {
      cb(error, null);
    });
  },
  // populatiob of states
  getPopulation: function(cb) {
    this.population.once('value', function (snapshot) {
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

function produceLinksAndNodes(data, nodes, links, demogr, type) {
  if (demogr === "Default") {
    produceDefault(data, nodes, links);
  } else {
    produceByDemography(data, nodes, links, demogr, type);
  }
}

function produceDefault(data, nodes, links) {
  Object.keys(data).forEach(function (from) {
    Object.keys(data[from]).forEach(function (to) {
      nodes.push({ "name": from });
      nodes.push({ "name": to });
      links.push({
        "source": from,
        "target": to,
        "value": +data[from][to].Type1.Total
      });
    });
  });
}

function produceByDemography(data, nodes, links, demogr, type) {
  //from region to 10 different age cateories
  Object.keys(data).forEach(function (from) {
    var ages = {};
    Object.keys(data[from]).forEach(function (to) {
      Object.keys(data[from][to][type][demogr]).forEach(function (i) {
        var age = data[from][to][type][demogr][i];
        if (!(i in ages)) {
          ages[i] = 0;
        }
        if (age !== "." && age !== "-") {
          ages[i] += +data[from][to][type][demogr][i];
        }
      });
    });
    // console.log(ages);
    Object.keys(ages).forEach(function (to) {
      nodes.push({ "name": from });
      nodes.push({ "name": to });
      links.push({
        "source": from,
        "target": to,
        "value": ages[to]
      });
    });
  });

  var regions = ["Northeast", "South", " Midwest", "West"];
  regions.forEach(function (r) {
    var ages = {};
    Object.keys(data).forEach(function (from) {
      Object.keys(data[from]).forEach(function (to) {
        if (r === to) {
          Object.keys(data[from][to][type][demogr]).forEach(function (i) {
            var age = data[from][to][type][demogr][i];
            if (!(i in ages)) {
              ages[i] = 0;
            }
            if (age !== "." && age !== "-") {
              ages[i] += +data[from][to][type][demogr][i];
            }
          });
        }
      });
    });
    // console.log(ages);
    Object.keys(ages).forEach(function (from) {
      nodes.push({ "name": from });
      nodes.push({ "name": r });
      links.push({
        "source": from,
        "target": r,
        "value": ages[from]
      });
    });
  });
}
