'use strict';

const mailgun = require('mailgun').Mailgun;
const privateInfo = require('../config/private');
const Config = require('../config/config');

exports.sendEmailVerificationLink = function(user, token){
    var mg = new mailgun(privateInfo.mailgunKey);
    mg.sendRaw('noReply@mtgTradeBinder.com', 
                user.email,
                'From: mtgtradeBinder' +
                '\nTo: ' + user.email +
                '\nContent-Type: text/html; charset=utf-8' +
                '\nSubject: MTG Trade Binder Registration' +
                '\n\n<p>Thank you ' + user.username + ' for registering with mtgTradeBinder</p>' +
                '<p><a href="'+Config.get('/baseUrl')+'/#/tradeBinder/verifyEmail/'+token+'">Verification link</a></p>',
                function(err) {
                    if (err){
                        console.log('Oh noes: ' + err);
                    } else{
                        console.log('Success');
                    }
                }
    );      
};