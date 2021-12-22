'use strict';

/**
 * Creates an account model for the current customer
 */
function getSpaceship(){
    var getSpaceshipService = dw.svc.LocalServiceRegistry.createService("http.swapi.getspaceship", {
      createRequest: function(svc, args) {
        svc.setRequestMethod("GET");
        return args;
      },
      parseResponse: function(svc, client) {
        return client.text;
      },
   });

   var response = getSpaceshipService.call().object;
   return response;
}


module.exports = {
    getSpaceship: getSpaceship
}