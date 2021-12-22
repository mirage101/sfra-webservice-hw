'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var HookMgr = require('dw/system/HookMgr');

server.extend(module.superModule);


server.append('Show', function (req, res, next) {
    var viewData  = res.getViewData();
    viewData.test1 ='test data example';
    next();
});

server.append('Show', function (req, res, next) {    
    var viewData = res.getViewData();

    if (!viewData){
        next();
    }else{
        if(HookMgr.hasHook('app.custom.hook.testHook')){
            
            viewData.customHookData = HookMgr.callHook(
                'app.custom.hook.testHook',
                'customHook'
            );            
            res.setViewData(viewData);
        }
        next();
    }
});


module.exports = server.exports();