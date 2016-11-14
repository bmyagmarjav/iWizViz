var express = require('express');
var app = express();
var http = require('http').Server(app);
app.set('port', (process.env.PORT || 5000));
app.use('', express.static('.tmp'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/img',  express.static(__dirname + '/dist/img'));

http.listen(app.get('port'), function(){
    console.log('listening on *:5000');
});
