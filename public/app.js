(function () {
    'use strict';

    angular.module('app', [
        'tradeBinders',
        'account.signIn',
        'account.register',
        'cardShops',
        'search',
        'account',
        'angular-jwt',
        'angular-storage'
    ])
            .config(function myConfig(jwtInterceptorProvider, $httpProvider) {
                jwtInterceptorProvider.tokenGetter = function (store) {
                    return store.get('jwt');
                };

                $httpProvider.interceptors.push('jwtInterceptor');
            })
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