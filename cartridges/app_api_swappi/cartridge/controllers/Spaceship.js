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
    'List',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {        
        var spaceship = JSON.parse(spaceshipService.getSpaceship());
        
        res.render('spaceship',{
            spaceship: spaceship
        });
        next();
    }
);

module.exports = server.exports();
