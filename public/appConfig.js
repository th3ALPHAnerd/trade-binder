(function() {
  'use strict';

  angular.module('app.appConfig', ['app.appController'])

  .config(['jwtInterceptorProvider', '$httpProvider', '$stateProvider', config]);

  function config(jwtInterceptorProvider, $httpProvider, $stateProvider) {

    jwtInterceptorProvider.tokenGetter = ['$http', 'jwtHelper', 'store', function($http, jwtHelper, store) {
      var accessToken = store.get('access-token');
      var refreshToken = store.get('refresh-token');

      if (jwtHelper.isTokenExpired(accessToken)) {
        return $http({
          url: '/api/auth/refresh',
          skipAuthorization: true,
          method: 'POST',
          data: { refresh_token: refreshToken }
        }).then(function(response) {
          accessToken = response.data.access_token;
          store.set('access-token', accessToken);
          return accessToken;
        });
      }
      return accessToken;
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
    $stateProvider
      .state('logout', {
        controller: 'appController'
      });
  }
})();
