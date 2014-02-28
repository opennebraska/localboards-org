'use strict';

/* App Module */

var localboardsApp = angular.module('localboardsApp', [
  'ngRoute',
  'localboardsControllers'
]);

localboardsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/boards', {
        templateUrl: 'partials/board-list.html',
        controller: 'BoardListCtrl'
      }).
      when('/boards/:boardId', {
        templateUrl: 'partials/board-detail.html',
        controller: 'BoardDetailCtrl'
      }).
      otherwise({
        redirectTo: '/boards'
      });
  }]);
