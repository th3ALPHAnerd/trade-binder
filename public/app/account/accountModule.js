(function () {
    'use strict';

    angular.module('account', ['ui.router'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('account', {
                                url: '/account',
                                templateUrl: 'app/account/account.html',
                                resolve: [],
                                data: {
                                    requiresLogin: true
                                }

                            });
                }]);
})();

