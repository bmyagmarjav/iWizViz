'use strict'

const firebase = require("firebase");
const TABLE1 = "/Migration Flows Between Regions";
const TABLE2 = "/Reason for Move";

//initial authorize
firebase.initializeApp({
 	serviceAccount: "cred/service.json",
 	databaseURL: "https://iwizviz.firebaseio.com"
});

try {
    var db = firebase.database();
} catch (error) {
    console.log(error);
}

var exports = module.exports = {};

exports.getRef1 = db.ref(TABLE1);

exports.getRef2 = db.ref(TABLE2);
