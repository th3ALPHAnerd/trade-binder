(function () {
    'use strict';
    
    angular.module('cardShops', ['ngRoute'])
            .config(['$routeProvider',function ($routeProvider) {
                    $routeProvider
                    .when('/cardShops', {
                        //url:'/cardShops',
                        templateUrl: 'app/cardShops/cardShops.html',
                        resolve:[]
                    });
                }]);
})();

