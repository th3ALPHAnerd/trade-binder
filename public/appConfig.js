(function () {
    'use strict';

    angular.module('app.appConfig', [
        'angular-jwt',
        'angular-storage',
        'app.appController'
    ])

            .config(['jwtInterceptorProvider', '$httpProvider', '$stateProvider',
                function (jwtInterceptorProvider, $httpProvider, $stateProvider) {
                    
                    jwtInterceptorProvider.tokenGetter = function (store) {
                        return store.get('jwt');
                    };
                    
                    $httpProvider.interceptors.push('jwtInterceptor');

                    $stateProvider
                            .state('logout', {
                                controller: 'appController'
                    });

                }]);

})();


