(function () {
    'use strict';

    angular.module('TradeBinders', ['ui.router', 'TradeBinders.TradeBindersController', 'TradeBinders.tradeBindersDirective'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('tradeBinders', {
                                url: '/tradeBinders',
                                templateUrl: 'app/tradeBinders/tradeBinders.html',
                                controller: 'TradeBindersController',
                                controllerAs: 'tradeBinder',
                                resolve: []
                            });
                }]);
})();
