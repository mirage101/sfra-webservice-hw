'use strict';

 var server = require('server');
 var system = require('dw/system/System');
 var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
  
 /**
 * Error-Start : This endpoint is called when there is a server error
 * @name Base/Error-Start
 * @function
 * @memberof Error
 * @param {middleware} - consentTracking.consent
 * @param {serverfunction} - get
 */
 server.get('Start', consentTracking.consent, function (req, res, next) {
    res.setStatusCode(500);
    var showError = system.getInstanceType() !== system.PRODUCTION_SYSTEM
        && system.getInstanceType() !== system.STAGING_SYSTEM;
    if (req.httpHeaders.get('x-requested-with') === 'XMLHttpRequest') {
        res.json({
            ErrorText: showError ? req.error || {} : {}
        });
        if(ErrorText == 'Secure connection required for this request.' && !req.httpSecure && (req.httpHeaders.containsKey("x-is-request_method")) && (req.httpHeaders["x-is-request_method"] == 'GET')){
            res.render('util/redirect');
        }else if(req.getHttpHeaders().get("x-requested-with") != null && req.getHttpHeaders().get("x-requested-with") === "XMLHttpRequest"){
            var format = req.httpParameterMap.format.stringValue || '';
            if(format === "json"){
                res.render('error/generalerrorjson');
            }else{
                res.render('error/generalerror');
            }
        }
    } 
    next();
});

/**
 * Error-Forbidden : This endpoint is called when a shopper tries to access a forbidden content. The shopper is logged out and the browser is redirected to the home page
 * @name Base/Error-Forbidden
 * @function
 * @memberof Error
 * @param {middleware} - consentTracking.consent
 * @param {serverfunction} - get
 */
server.get('Forbidden', consentTracking.consent, function (req, res, next) {
    var CustomerMgr = require('dw/customer/CustomerMgr');

    CustomerMgr.logoutCustomer(true);
    res.render('error/forbidden');
    next();
});