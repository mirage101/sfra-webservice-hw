'use strict';

/**
 * @namespace Subscribe
 */

var server = require('server');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var UUIDUtils = require('dw/utils/UUIDUtils');
        
/**
 *
 */
server.post('Create', server.middleware.https, function(req, res, next){
    var type = 'Subscription';
    var keyValue = UUIDUtils.createUUID();
    var form = req.form;
    var error = false;

    if(!form){
        error = true;
    }

    try{
        Transaction.wrap(function(){
            var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
            newsletter.custom.firstName = firstName;
            newsletter.custom.lastName = lastName;
            newsletter.custom.email = email;
            if(newsletter.custom.gender !== "undefined"){
                newsletter.custom.gender = gender;
            }
        })    
    } catch(error){
        error = true;
    }

    if(error){
        res.json({
            error: true
        })
    }else{
        res.json({
            error: false,
            id: keyValue
        })
    }
    
    return next();
});

server.post('Delete', server.middleware.https, function(req, res, next){
    var type = 'Subscription';
    var form = req.form;
    var keyValue = form.id;
    
    var error = false; 

    if(!form){
        error = true;
    }

    try{
        var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
        Transaction.wrap(function(){
            CustomObjectMgr.remove(newsletter);
        });
    } catch(error){
        error = true;
    }
    
    if(error){
        res.json({
            error: true
        })
    }else{
        res.json({
            error: false,
            id: keyValue
        })
    }
    return next();
});

module.exports = server.exports();
