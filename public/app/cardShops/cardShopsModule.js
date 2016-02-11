(function () {
    'use strict';
    
    angular.module('cardShops', ['ui.router'])
            .config(['$stateProvider',function ($stateProvider) {
                    $stateProvider
                    .state('cardShops', {
                        url:'/cardShops',
                        templateUrl: 'app/cardShops/cardShops.html',
                        resolve:[]
                    });
                }]);
})();

