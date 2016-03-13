(function() {
  'use strict';

  angular
    .module('account.UserService', [])
    .factory('UserService', ['$http', 'store', 'jwtHelper', UserService]);

  function UserService($http, store, jwtHelper) {
    var user = {};

    function logout() {
      store.remove('access-token');
      store.remove('refresh-token');
    }

    function register(data) {
      logout();
      return $http.post('/api/accounts/register', data).then(handleSuccess, handleError('Error creating user'));
    }

    function login(data) {
      logout();
      return $http.post('/api/accounts/login', data).then(handleSuccess, handleError('Error loggin in'));
    }

    function isLoggedIn() {
      if (store.get('access-token')) {
        return !jwtHelper.isTokenExpired(store.get('access-token'));
      }

      return false;
    }

    function currentUser() {
      var payload;
      if (isLoggedIn()) {
        payload = jwtHelper.decodeToken(store.get('access-token'));
        return payload.user;
      }
    }

    function handleSuccess(response) {
      store.set('access-token', response.data.accessToken);
      store.set('refresh-token', response.data.refreshToken);
      return {
        success: true,
        data: response.data
      };
    }

    function handleError(error) {
      return function() {
        return {
          success: false,
          message: error
        };
      };
    }

    user.register = register;
    user.login = login;
    user.logout = logout;
    user.isLoggedIn = isLoggedIn;
    user.currentUser = currentUser;

    return user;
  }

})();
