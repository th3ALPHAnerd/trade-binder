(function () {
    'use strict';
    
    angular.module('tradeBinders.TradeBindersController', [])
            .controller('TradeBindersController', TradeBindersController);
    
    function TradeBindersController() {
        var vm = this;
        console.log("In trader controller.");
    }
})();