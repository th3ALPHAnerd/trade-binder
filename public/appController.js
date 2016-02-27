(function () {
    'use strict';

    angular.module('app')
            .controller('appController', ['UserService', '$state', appController]);

    function appController(UserService, $state) {
        UserService.logout();
        $state.go('home');
    }

})();