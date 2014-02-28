'use strict';

angular.module('localboardsUiReduxApp')
  .controller('BoardsDetailCtrl', function ($scope, $routeParams, $http) {
  	var api = new $.LocalBoardsAPI();
  	var boardId = $routeParams.boardId;

  	function onBoardRequest(success, message, data) {
		if (success) {
			$scope.board = data.data;
			$scope.$apply();
		}
	}
	api.onBoardRequest = onBoardRequest;
	// TODO: pull state from URL params
  	api.getBoardFromStateWithId('ne', boardId);
});