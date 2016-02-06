(function () {
    'use strict';

    angular.module('app', [
        'tradeBinders',
        'account.signIn',
        'account.register',
        'cardShops',
        'account',
        'angular-jwt'
    ])
            .config(function myConfig(jwtInterceptorProvider, $httpProvider) {
                jwtInterceptorProvider.tokenGetter = function (store) {
                    return store.get('jwt');
                };

                $httpProvider.interceptors.push('jwtInterceptor');
            });


})();