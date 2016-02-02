(function () {
    'use strict';
    
    angular.module('account.register', ['ngRoute'])
            .config(['$routeProvider',function ($routeProvider) {
                    $routeProvider
                    .when('/register', {
                        templateUrl: 'app/account/register/register.html',
                        resolve:[]
                    });
                }]);
})();

