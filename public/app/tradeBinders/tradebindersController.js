(function () {
    'use strict';
    angular.module('tradeBinder.tradeBinders', [])
            .controller('TradeBindersController', TradeBindersController);
    
    function TradeBindersController() {
        var vm = this;
        console.log("In trader controller.");
    }
})();