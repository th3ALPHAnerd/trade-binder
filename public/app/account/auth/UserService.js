(function () {
  'use strict';

  angular
  .module('account.UserService', [])
  .factory('UserService', ['$http', 'store', 'jwtHelper', 'auth', UserService]);

  function UserService($http, store, jwtHelper, auth) {
    var user = {};

    function logout() {
      auth.signout();
      store.remove('jwt');
      store.remove('profile');
    }

    function register(data) {
      logout();
      return $http.post('/api/auth/register', data).then(handleSuccess, handleError('Error creating user'));
    }

    function login(data) {
      logout();
      auth.signin({});
      return $http.post('/api/auth/login', data).then(handleSuccess, handleError('Error loggin in'));
    }

    function isLoggedIn() {
      if (store.get('jwt')) { return !jwtHelper.isTokenExpired(store.get('jwt')); }

      return false;
    }

    function currentUser() {
      var payload;
      if (isLoggedIn()) {
        payload = jwtHelper.decodeToken(store.get('jwt'));
        return payload.user;
      }
    }

    function handleSuccess(response) {
      store.set('jwt', response.data.token);
      store.set('profile', response.data.token);
      return { success: true,  data: response.data };
    }

    function handleError(error) {
      return function () {
        return { success: false, message: error };
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
