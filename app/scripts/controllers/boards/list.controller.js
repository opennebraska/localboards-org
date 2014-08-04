'use strict';

angular.module('localboardsApp')
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

	/* call this method to get open seats from main board list */
	function onBoardMemberListRequest(success, message, data) {
		if (success) {
			for (var i = 0; i < $scope.boards.length; i++) {
				if ($scope.boards[i].id === data.id) {
					var openSeats = 0;
					if ($scope.boards[i].seats >= 0) {
						openSeats = $scope.boards[i].seats - data.length;

						if (openSeats < 0) { openSeats = 0; }

						$scope.boards[i].openSeats = openSeats;
					} else {
						$scope.boards[i].openSeats = -1; // OPEN seats
					}
					$scope.$apply();
					break;
				}
			}
		}
	}

	function setupBoardSeats() {
		$.each($scope.boards, function() {
			this.seatLimit = function() {
				if (this.seats === -1)
					return 'OPEN';
				else
					return this.seats;
			};
			api.getBoardMemberListFromStateBoardById('ne', this.id, 0, 1000);
		});
	}

	api.onBoardListRequest = onBoardListRequest;
	api.onBoardMemberListRequest = onBoardMemberListRequest;
	// TODO: pull state from URL params
  	api.getBoardsByState('ne', 0, 25);
});
