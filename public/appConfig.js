(function () {
    'use strict';

    angular.module('app.appConfig', [
        'angular-jwt',
        'app.appController'
    ])

            .config(['jwtInterceptorProvider', '$httpProvider', 
                function (jwtInterceptorProvider, $httpProvider) {

                    jwtInterceptorProvider.tokenGetter = ['store', function (store) {
                            return store.get('jwt');
                        }];

                    $httpProvider.interceptors.push('jwtInterceptor');

                }]);

})();


