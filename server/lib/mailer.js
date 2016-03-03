'use strict';

const mailgun = require('mailgun').Mailgun;
const privateInfo = require('../config/private');
//const Hoek = require('hoek');


exports.sendEmailVerificationLink = function(user, token){
    //var options = Hoek.applyToDefaults({ basePath: '' }, options);
    console.log(privateInfo.mailgunKey);
    console.log('email: ' + user.email);
     console.log('token: ' + token);
    //console.log('id: '+ user.id);
    var mg = new mailgun(privateInfo.mailgunKey);
    mg.sendRaw('noReply@mtgTradeBinder.com', 
                user.email,
                'From: mtgtradeBinder' +
                '\nTo: ' + user.email +
                '\nContent-Type: text/html; charset=utf-8' +
                '\nSubject: MTG Trade Binder Registration' +
                '\n\n<p>Thank you ' + user.name + ' for registering with mtgTradeBinder</p>' +
                '<p><a href="http://localhost:8000/api/accounts/verifyEmail/'+token+'">Verification link</a></p>',
                function(err) {
                    if (err){
                        console.log('Oh noes: ' + err);
                    } else{
                        console.log('Success');
                    }
                }
    );      
};