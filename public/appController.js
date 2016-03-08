(function () {
    'use strict';

    angular.module('app.appController', ['account.UserService'])
            .controller('appController', ['UserService', '$state', appController]);

    function appController(UserService, $state) {
        var vm = this;
        
        vm.logout = function () {

            UserService.logout();
            $state.go('home');
            reload($state);

        };

    }
    
    function reload($state){
        $state.go($state.current.name, $state.params, { reload: true });
    }

})();