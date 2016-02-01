(function () {
    'use strict';
    
    angular.module('home', ['ngRoute'])
            .config(['$routeProvider',function ($routeProvider) {
                    $routeProvider
                    .when('/home', {
                        templateUrl: 'app/home/home.html',
                        resolve:{}
                    });
                }]);
})();

