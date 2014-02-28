'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope, $http) {
    $http.get('http://rest-service.guides.spring.io/greeting').
        success(function(data) {
            $scope.greeting = data;
        }
    );
});
