(function () {
    'use strict';

    angular.module('tradeBinders', ['tradeBinders.TradeBindersController', 'tradeBinders.tradeBindersDirective'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('tradeBinders', {
                                url: '/tradeBinder/tradeBinders',
                                templateUrl: 'app/tradeBinders/tradeBinders.html',
                                controller: 'TradeBindersController',
                                controllerAs: 'tradeBinder',
                                resolve: []
                            });
                }]);
})();
