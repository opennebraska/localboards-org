'use strict';

angular.module('localboardsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/boards/list.html',
        controller: 'BoardsListCtrl'
      })
      .when('/boards', {
        templateUrl: 'views/boards/list.html',
        controller: 'BoardsListCtrl'
      })
      .when('/boards/create', { 
        templateUrl: 'views/boards/create.html',
        controller: 'BoardsCreateCtrl'
      })
      .when('/boards/:boardId', {
        templateUrl: 'views/boards/detail.html',
        controller: 'BoardsDetailCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });