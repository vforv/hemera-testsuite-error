'use strict';

const Hapi = require('hapi');
const lab = require('lab')
const code = require('code')
const Hemera = require('nats-hemera')
const serverMod = require('./server');
const L = exports.lab = lab.script();
const expect = code.expect;
const Nats = require('hemera-testsuite/nats')


const server = serverMod.server(false)

L.experiment('General info non individual kycc test', () => {

    L.test('Create general info', (done) => {
      const nats = new Nats()
        const hemera = new Hemera(nats, {
            logLevel: 'info'
        });

      hemera.ready(() => {
            hemera.add({
                topic: "simple",
                cmd: "act"
            }, (msg, done) => {
                done(null, "Hello World")
            })

            const options = {
                      method: "GET",
                      url: "/v1/route",
                      payload: {
                      }
                  };

            server.inject(options, (response) => {
                    done();
                });

        });


    });

});
