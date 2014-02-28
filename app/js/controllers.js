'use strict';

/* Controllers */

var localboardsControllers = angular.module('localboardsControllers', []);

localboardsControllers.controller('BoardListCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('http://api.localboards.org/states/NE/boards').
            success(function(data) {
                $scope.boards = data.data;
            }
        );
    }
]);

localboardsControllers.controller('BoardDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.boardId = $routeParams.boardId;
    }
]);


