'use strict';

const Hapi = require('hapi');



var PORT = 6242
var authUrl = 'nats://localhost:' + PORT

module.exports.server = (env) => {
  const server = new Hapi.Server();
  server.connection({ port: 3000, host: 'localhost' });

  server.register([
      { register: require('./routes') },
      {
          register: require('hapi-hemera'),
          options: {
              hemera: {
                  name: 'test',
                  childLogger: true,
                  tag: 'hemera-1'
              },
              nats: {
                  'url': authUrl
              }
          }
      }], {
          routes: {
              prefix: '/v1'
          }
      }, (err) => {

          if (err) {
              throw err;
          }
          server.initialize((err) => {
              if (env) {
                  server.start((err) => {
                      server.hemera.add({
                        topic: "simple",
                        cmd: "act"
                      }, (err, cb) => {
                        cb(null, "NOW WORKS!!!! BUT NOT IN TESTING!!!!")
                      })
                      
                      if (err) {
                          throw err;
                      }
                      server.log('info', 'Server running at: ' + server.info.uri);
                  });
              }
          });
      });
      return server;
}
