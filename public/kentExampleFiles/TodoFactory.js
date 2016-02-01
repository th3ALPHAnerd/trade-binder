(function () {
    'use strict';
    angular.module('Todo.TodoFactory', [])
            .factory('TodoFactory', TodoFactory);

    function TodoFactory() {
        var todoList = [
            {title: 'Collect Coins', quantity: 99},
            {title: 'Eat mushrooms', quantity: 2},
            {title: 'Find the Princess', quantity: 1},
            {title: 'Get Stars', quantity: 100}
        ];

        return {
            get: function () {
                return todoList;
            },
            add: function (stuff) {
                todoList.push({'title': stuff, quantity: '1'});
            },
            remove: function (stuff) {
                var indexOf = todoList.indexOf(stuff);
                todoList.splice(indexOf, 1);
            },
            upQuantity: function (stuff) {
                var indexOf = todoList.indexOf(stuff);
                todoList[indexOf].quantity += 1;
            },
            lowerQuantity: function (stuff) {
                var indexOf = todoList.indexOf(stuff);
                todoList[indexOf].quantity -= 1;
            }
        };
    }
})();