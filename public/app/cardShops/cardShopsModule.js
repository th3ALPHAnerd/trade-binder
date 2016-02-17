(function () {
    'use strict';

    angular.module('cardShops', ['ui.router'])
            .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
                    $stateProvider
                            .state('cardShops', {
                                url: '/tradeBinder/cardShops',
                                templateUrl: 'app/cardShops/cardShops.html',
                                resolve: []
                            });
                }]);
})();

