'use strict';

angular.module('localboardsUiReduxApp')
  .controller('BoardsListCtrl', function ($scope) {
  	shared_showLoader();
  	var api = new $.LocalBoardsAPI();
  	function onBoardListRequest(success, message, data) {
		if (success) {
			$scope.boards = data;
			setupBoardSeats();
			$scope.$apply();
		}
		shared_hideLoader();
	}
	function setupBoardSeats() {
		$.each($scope.boards, function() {
			this.seatLimit = function() { 
				if (this.seats === -1)
					return 'OPEN';
				else
					return this.seats;
			};
		});
	}
	
	api.onBoardListRequest = onBoardListRequest;
	// TODO: pull state from URL params
  	api.getBoardsByState('ne', 0, 25);
});