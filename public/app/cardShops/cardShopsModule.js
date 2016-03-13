(function () {
    'use strict';

    angular.module('cardShops', [])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('cardShops', {
                                url: '/tradeBinder/cardShops',
                                templateUrl: 'app/cardShops/cardShops.html',
                                resolve: []
                            });
                }]);

})();

