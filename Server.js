var express = require('express');
var app = express();
var port = 3100;
var appName = 'NodeService'
var bodyParser = require('body-parser');
var rest = require("./REST.js");
var cors = require("cors");
app.use(cors());

function REST(){
    var self = this;
    self.configureExpress();
};

REST.prototype.configureExpress = function() {
      var self = this;
    
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());    
    
      var router = express.Router();
      app.use('/'+appName, router);
    
      var rest_router = new rest(router);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(port,function(){
          console.log(appName+" REST Server started at Port "+port);
      });
}

REST.prototype.stop = function(err) {
    process.exit(1);
}

new REST();