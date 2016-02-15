(function () {
    'use strict';

    angular.module('app', [
        'home',
        'tradeBinders',
        'account.signIn',
        'account.register',
        'cardShops',
        'search',
        'angular-jwt',
        'angular-storage',
        'ui.router'
    ])
            .config(['jwtInterceptorProvider', '$httpProvider', '$locationProvider',
                function myConfig(jwtInterceptorProvider, $httpProvider, $locationProvider) {
                    jwtInterceptorProvider.tokenGetter = function (store) {
                        return store.get('jwt');
                    };
                    $httpProvider.interceptors.push('jwtInterceptor');

                    $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    });
                }])
            .run(function ($rootScope, $state, store, jwtHelper) {
                $rootScope.$on('$stateChangeStart', function (e, to) {
                    if (to.data && to.data.requiresLogin) {
                        if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                            e.preventDefault();
                            $state.go('signIn');
                        }
                    }
                });
            });

})();

