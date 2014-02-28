'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope, $http) {
    $http.get('http://api.localboards.org/states/NE/boards').
        success(function(data) {
            $scope.boards = data.data;
        }
    );
});
