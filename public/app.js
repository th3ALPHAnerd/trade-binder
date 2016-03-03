(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'angular-jwt',
        'angular-storage',
        'auth0',
        'home',
        'tradeBinders',
        'account',
        'cardShops',
        'search',
        //'app.appController',
        'app.appConfig'
    ])
            .run(['$rootScope', '$state', '$http', '$templateCache', 'store', 'jwtHelper','auth', function ($rootScope, $state, $http, $templateCache, store, jwtHelper,auth) {
                    $rootScope.$on('$stateChangeStart', function (e, to) {
                        
                        var token = store.get('jwt');
                        
                        if(token){
                            if(!jwtHelper.isTokenExpired(token)){
                                if(!auth.isAuthenicated){
                                    auth.authenticate(store.get('profile'), token);
                                }
                            }
                        }
                        if (to.data && to.data.requiresLogin) {
                            if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                                e.preventDefault();
                                $state.go('login');
                            }
                        }
                        $http.get('app/account/register/register.html', {
                            cache: $templateCache
                        });
                        $http.get('app/account/login/login.html', {
                            cache: $templateCache
                        });
                        $http.get('app/tradeBinders/tradeBinders.html', {
                            cache: $templateCache
                        });
                        $http.get('app/search/search.html', {
                            cache: $templateCache
                        });
                        $http.get('app/cardShops/cardShops.html', {
                            cache: $templateCache
                        });
                    });
                }]);

})();
