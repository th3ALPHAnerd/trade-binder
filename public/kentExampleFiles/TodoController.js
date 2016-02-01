(function () {
    'use strict';
    angular.module('Todo.TodoController', ['Todo.TodoFactory'])
            .controller('TodoController', TodoController);
    function TodoController(TodoFactory) {
        var vm = this;

        vm.tasks = TodoFactory.get();

        vm.addTodo = function (item) {
            TodoFactory.add(item);
            vm.newTodo = '';
        };

        vm.remove = function (item) {
            TodoFactory.remove(item);
        };

        vm.upQuantity = function (item) {
            TodoFactory.upQuantity(item);
        };

        vm.lowerQuantity = function (item) {
            TodoFactory.lowerQuantity(item);
        };
    }
})();