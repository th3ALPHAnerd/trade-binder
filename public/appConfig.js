(function () {
    'use strict';

    angular.module('app.appConfig', [
        'angular-jwt',
        'app.appController'
    ])

            .config(['jwtInterceptorProvider', '$httpProvider', '$stateProvider',
                function (jwtInterceptorProvider, $httpProvider, $stateProvider) {

                    jwtInterceptorProvider.tokenGetter = ['store', function (store) {
                            return store.get('jwt');
                        }];

                    $httpProvider.interceptors.push('jwtInterceptor');

                    $stateProvider
                            .state('logout', {
                                controller: 'appController'
                            });

                }]);

})();


