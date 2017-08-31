var express = require('express');
module.exports = function(app) {
  var router = express.Router();
  var cpu = '', memory = '';
  router.get('/', function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host');
    var socket = require('socket.io-client')(fullUrl);
    socket.on('cpu', function(data) {
      cpu = JSON.parse(data);
    });
    socket.on('memory', function(data) {
      memory = JSON.parse(data);
    });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('appmetrics_cpu_process: ' + cpu.process + '\n');
    res.write('appmetrics_cpu_system: ' + cpu.system + '\n');
    res.write('appmetrics_memory_physical_total: ' + memory.physical_total + '\n');
    res.write('appmetrics_memory_physical_used: ' + memory.physical_used + '\n');
    res.write('appmetrics_memory_physical_free: ' + memory.physical_free + '\n');
    res.write('appmetrics_memory_virtual: ' + memory.virtual + '\n');
    res.write('appmetrics_memory_private: ' + memory.private + '\n');
    res.write('appmetrics_memory_physical: ' + memory.physical + '\n');
    // res.write('Using_Appmetrics_dash_Prometheus \n');
    res.end();
  });
  app.use('/metrics', router);
}
