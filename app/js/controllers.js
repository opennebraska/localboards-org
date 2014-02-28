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

localboardsControllers.controller('BoardDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.boardId = $routeParams.boardId;
        $http.get('http://api.localboards.org/states/NE/boards/' + $routeParams.boardId).
            success(function(data) {
                $scope.board = data.data;
            }
        );
    }
]);


