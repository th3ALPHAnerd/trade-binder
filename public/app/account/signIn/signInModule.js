(function () {
    'use strict';
    
    angular.module('account.signIn', ['ngRoute', 'account.signIn.signInController'])
            .config(['$routeProvider',function ($routeProvider) {
                    $routeProvider
                    .when('/signIn', {
                        url: '/signIn',
                        templateUrl: 'app/account/signIn/signIn.html',
                        Controller: 'signInController',
                        ControllerAs: 'signIn',
                        resolve:[]
                    });
                }]);
})();

