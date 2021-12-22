'use strict';

/**
 * 
 */
function getSpaceship() {

    var getSpaceshipService = dw.svc.LocalServiceRegistry.createService("http.swapi.getdeathstar",{
        createRequest: function(svc, args) {
            svc.setRequestsMethod("GET");
            return args;
        },
        parseResponse: function(svc, client) {
            return client.text;
        },
        filterLogMessage: function(msg) {
            return msg.replace("cost_in_credits", "$$$$$$$$$$$$$");
        }
    });

   var response = getSpaceshipService.call().object;

  return response;
}

module.exports = {
   getSpaceship: getSpaceship
};

