'use strict';

angular.module('localboardsUiReduxApp')
  .controller('BoardsCtrl', function ($scope, $http) {
    $http.get('http://api.localboards.org/states/NE/boards').
        success(function(data) {
            $scope.boards = data.data;
        }
    );
});