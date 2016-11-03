var config = {
  apiKey: "AIzaSyC188Gz-CiFIHxtHTRWq6P6EGgoRXWhs9s",
  authDomain: "iwizviz.firebaseapp.com",
  databaseURL: "https://iwizviz.firebaseio.com",
  storageBucket: "iwizviz.appspot.com"
};

var tables = {
  migratiion: 'Migration Flows Between Regions'
};

firebase.initializeApp(config);

function Firebaseio() {
  this.root = firebase.database().ref();
}

Firebaseio.prototype = {
  // get (Migraction Flows Between Regons) reference
  getMigrationRef: function () {
    return this.root.child(tables.migratiion);
  }
};
