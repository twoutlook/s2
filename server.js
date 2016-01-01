//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
console.log ("... Year 2016!");
console.log ("... start server.js!");
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://youbike2.firebaseio.com/");

console.log ("... before auth");
//mark-omg
// var token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmstb21nIiwic29tZSI6ImFyYml0cmFyeSIsImRhdGEiOiJoZXJlIn0sImlhdCI6MTQ1MTU2OTIxNH0.5VcBMOaIODPZyzoLRXfmhXVFXgUm-amiaXhZSvuGtG4";

//admin
var token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6ImFkbWluIiwiY2hpbmVzZSI6Iui2hee0mueuoeeQhuWToSIsInNvbWUiOiJhcmJpdHJhcnkiLCJkYXRhIjoiaGVyZSJ9LCJpYXQiOjE0NTE1NzE0Mzd9.8wXWTagoogpnz-8hShZMSz1WKHxeLOv7BEktcEETk0k";


//https://www.firebase.com/docs/web/api/firebase/authwithcustomtoken.html
myFirebaseRef.authWithCustomToken(token, function(error, authData) {
  if (error) {
    console.log("Authentication Failed!", error);
  } else {
  //  console.log("Authenticated successfully with payload:", authData);
    console.log("uid:", authData.uid);



  }
});
console.log ("... after auth");
var url ="http://data.taipei/youbike";//youbike即時資訊

var request = require('request');
var zlib = require('zlib');

var options = {
  url: url,
  headers: {
    'X-some-headers'  : 'Some headers',
    'Accept-Encoding' : 'gzip, deflate',
  },
  encoding: null
};





// var http = require('http');
// var path = require('path');

// var async = require('async');
// var socketio = require('socket.io');
// var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
// var router = express();
// var server = http.createServer(router);
// var io = socketio.listen(server);

// router.use(express.static(path.resolve(__dirname, 'client')));
// var messages = [];
// var sockets = [];

// io.on('connection', function (socket) {
//     messages.forEach(function (data) {
//       socket.emit('message', data);
//     });

//     sockets.push(socket);

//     socket.on('disconnect', function () {
//       sockets.splice(sockets.indexOf(socket), 1);
//       updateRoster();
//     });

//     socket.on('message', function (msg) {
//       var text = String(msg || '');

//       if (!text)
//         return;

//       socket.get('name', function (err, name) {
//         var data = {
//           name: name,
//           text: text
//         };

//         broadcast('message', data);
//         messages.push(data);
//       });
//     });

//     socket.on('identify', function (name) {
//       socket.set('name', String(name || 'Anonymous'), function (err) {
//         updateRoster();
//       });
//     });
//   });

// function updateRoster() {
//   async.map(
//     sockets,
//     function (socket, callback) {
//       socket.get('name', callback);
//     },
//     function (err, names) {
//       broadcast('roster', names);
//     }
//   );
// }

// function broadcast(event, data) {
//   sockets.forEach(function (socket) {
//     socket.emit(event, data);
//   });
// }


var schedule = require('node-schedule');

var cnt=0;
var j = schedule.scheduleJob('*/30 * * * * *', function(){

  //
  var strDate=new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '')     // delete the dot and everything after
    
  cnt++;
  console.log('...to update firebase... cnt='+cnt+ " "+strDate);
  
  request.get(options, function (error, response, body) {

  if (!error && response.statusCode == 200) {
    // If response is gzip, unzip first
    var encoding = response.headers['content-encoding']
    if (encoding && encoding.indexOf('gzip') >= 0) {
      zlib.gunzip(body, function(err, dezipped) {
        var json_string = dezipped.toString('utf-8');
        var json = JSON.parse(json_string);
        
        // console.log(" NOW?retCode "+ json.retCode);
        // console.log(" NOW?retCode "+ json.retVal);
     console.log('...### before myFirebaseRef.set(json.retVal);');
        var result= myFirebaseRef.set(json.retVal);
          console.log('...### after myFirebaseRef.set(json.retVal); result='+result);
        // Process the json..
      });
    } else {
      // Response is not gzipped
    }
  }
});

  
  
});



// {"retCode":1,
// "retVal":{"0001":
// {"sno":"0001","sna":"捷運市政府站(3號出口)","tot":"180","sbi":"112","sarea":"信義區","mday":"20151227161716","lat":"25.0408578889","lng":"121.567904444","ar":"忠孝東路\/松仁路(東南側)","sareaen":"Xinyi Dist.","snaen":"MRT Taipei City Hall Stataion(Exit 3)-2","aren":"The S.W. side of Road Zhongxiao East Road & Road Chung Yan.","bemp":"66","act":"1"},"0002":{"sno":"0002",






// server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = server.address();
//   console.log("Chat server listening at", addr.address + ":" + addr.port);
// });
