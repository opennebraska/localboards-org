'use strict';

angular.module('localboardsUiReduxApp')
  .controller('BoardsListCtrl', function ($scope, $http) {
  	var api = new $.LocalBoardsAPI();
  	function onBoardListRequest(success, message, data) {
		if (success) {
			$scope.boards = data;
			$scope.$apply();
		}
	}
	api.onBoardListRequest = onBoardListRequest;
	// TODO: pull state from URL params
  	api.getBoardsByState('ne', 0, 25);
});