(function () {
    'use strict';
    
    angular.module('account.signIn', ['ngRoute'])
            .config(['$routeProvider',function ($routeProvider) {
                    $routeProvider
                    .when('/signIn', {
                        templateUrl: 'app/account/signIn/signIn.html',
                        resolve:[]
                    });
                }]);
})();

