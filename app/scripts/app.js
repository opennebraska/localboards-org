'use strict';

angular.module('localboardsUiReduxApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/boards', {
        templateUrl: 'views/boards-list.html',
        controller: 'BoardsListCtrl'
      })
      .when('/boards/:boardId', {
        templateUrl: 'views/boards-detail.html',
        controller: 'BoardsDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
