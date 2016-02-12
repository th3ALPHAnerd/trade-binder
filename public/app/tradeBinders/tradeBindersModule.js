(function () {
    'use strict';

    angular.module('tradeBinders', ['ui.router', 'tradeBinders.TradeBindersController'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('tradeBinders', {
                                url: '/tradeBinders',
                                templateUrl: 'app/tradeBinders/tradeBinders.html',
                                controller: 'TradeBindersController',
                                controllerAs: 'TradeBinder',
                                resolve: []
                            });
                }]);
})();
