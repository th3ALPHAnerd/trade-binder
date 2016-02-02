(function () {
    'use strict';
    
    angular.module('tradeBinders', ['ngRoute', 'tradeBinders.TradeBindersController'])
            .config(['$routeProvider',function ($routeProvider) {
                    $routeProvider
                    .when('/tradeBinders', {
                        templateUrl: 'app/tradeBinders/tradeBinders.html',
                        controller: 'TradeBindersController',
                        controllerAs: 'TradeBinder',
                        resolve:[]
                    });
                }]);
})();