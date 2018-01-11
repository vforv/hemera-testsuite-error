'use strict';

const Hapi = require('hapi');
const lab = require('lab')
const code = require('code')
const Hemera = require('nats-hemera')
const serverMod = require('./server');
const L = exports.lab = lab.script();
const expect = code.expect;
const HemeraTestsuite = require('hemera-testsuite')


let server

var PORT = 6242
var authUrl = 'nats://localhost:' + PORT
var natsS

// Start up our own nats-server
L.before(function (done) {
    natsS = HemeraTestsuite.start_server(PORT, done);
    server = serverMod.server(false);
})

// Shutdown our server after we are done
L.after(function () {
    natsS.kill()
})

L.experiment('General info non individual kycc test', () => {

    L.test('Create general info', (done) => {
        const nats = require('nats').connect(authUrl)
        const hemera = new Hemera(nats)

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
