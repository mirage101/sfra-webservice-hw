'use strict';

var server = require('server');
var spaceshipService = require('*/cartridge/scripts/spaceshipService.js')
var cache = require('*/cartridge/scripts/middleware/cache');
/**
 * Spaceship : Retrieve death star info
 * @name Spaceship
 * @function
 */
server.get(
    'Fact',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var getSpaceship = JSON.parse(spaceshipService.getSpaceship());

        res.render('spaceship', {
            getSpaceship: getSpaceship
        });
        next();
    }
);

module.exports = server.exports();
