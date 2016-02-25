(function () {
  'use strict';

  angular.module('app', [
    'ui.router',
    'angular-jwt',
    'angular-storage',
    'home',
    'tradeBinders',
    'account',
    'cardShops',
    'search'
  ])
  .config(['jwtInterceptorProvider', '$httpProvider', '$locationProvider',
          function myConfig(jwtInterceptorProvider, $httpProvider, $locationProvider) {
            jwtInterceptorProvider.tokenGetter = function (store) {
              return store.get('jwt');
            };
            $httpProvider.interceptors.push('jwtInterceptor');

            // $locationProvider.html5Mode({
            //   enabled: true,
            //   requireBase: false
            // });
          }])
          .run(function ($rootScope, $state, $http, $templateCache, store, jwtHelper) {
            $rootScope.$on('$stateChangeStart', function (e, to) {
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
          });
})();
