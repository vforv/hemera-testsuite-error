'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/route',
        handler: function (request, reply) {
            return request.hemera.act({
              topic: "simple",
              cmd: "act"
            }, (err, result) => {
                console.log(err)
                if (err) {
                    return reply(Boom.boomify(err, { statusCode: 500 }));
                }
                return reply({data: result})
            })
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
