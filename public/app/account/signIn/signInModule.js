(function () {
    'use strict';

    angular.module('account.signIn', ['ui.router', 'account.signIn.signInController'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('signIn', {
                                url: '/tradeBinder/signIn',
                                templateUrl: 'app/account/signIn/signIn.html',
                                Controller: 'signInController',
                                ControllerAs: 'signIn',
                                resolve: []
                            });
                }]);
})();

