(function () {
    'use strict';

    angular
            .module('register.RegisterCtrl', ['ngRoute', 'angular-storage'])
            .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl() {
       var vm = this;
       
       var user = {};
       
       
        
        vm.registerSubmit = function(){
            
        };
    }


})();

