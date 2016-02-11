(function () {
    'use strict';
    angular
            .module('TradeBinders.TradeBindersDirective', [])
            .directive('tradeBindersDirective', tradeBindersDirective);

    function tradeBindersDirective() {
        return{
            restrict: 'A',
            template: '<span>{{name}}</span>',
            link: function (scope, el, attrs) {
                scope.name = attrs.name;
                $(el).popover({
                    trigger: 'hover',
                    html: true,
                    content: '<img src='+attrs.cardImage +'>',
                    placement: "bottom"
                });
            }
        };

    }
    ;


})();

