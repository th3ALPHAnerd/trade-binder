(function () {
    'use strict';
    angular.module('tradeBinders.tradeBindersDirective', [])
            .directive('tradeBindersDirective', [tradeBindersDirective]);

    function tradeBindersDirective() {
        return{
            restrict: 'A',
            template: '<span>{{name}}</span>',
            link: function (scope, el, attrs) {
                scope.name = attrs.name;
                $(el).popover({
                    trigger: 'click',
                    html: true,
                    content: '<img src=' + attrs.cardImage + '>',
                    placement: "top"
                });
            }
        };
    }
})();