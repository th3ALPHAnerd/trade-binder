(function () {
    'use strict';
    angular.module('tradeBinder', ['ngRoute'])
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/tradeBinders', {
                        templateUrl: 'app/tradeBinders/tradeBinders.html',
                        controller: 'TradeBindersController'
                    });
                }]);
})();