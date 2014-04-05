'use strict';

angular.module('localboardsUiReduxApp')
  .controller('BoardsDetailCtrl', function ($scope, $routeParams) {
  	var api = new $.LocalBoardsAPI();
  	var boardId = $routeParams.boardId;
  	$scope.boardId = boardId;

  	function onBoardRequest(success, message, data) {
		if (success) {
			$scope.board = data.data;
			$scope.board.title = shared_toTitleCase($scope.board.title);
			$scope.$apply();
			api.getBoardSeatListFromStateBoardById('ne', data.data.id, 0, 1000);
		}
	}
	function onBoardMemberListRequest(success, message, data) {
		var memberListSize = 0;
		if (success) {
			$.each(data, function() {
				//vm.addMember(new createNewBoardMember(this));
				api.getMemberFromStateById('ne', this.id);
			});
			memberListSize = data.length;
		}
		updateBoardSeats(memberListSize);
	}
	function onBoardSeatListRequest(success, message, data) {
		if (success) {
			$.each(data, function() {
				//vm.addSeat(new createNewSeat(this));
			});
			api.getBoardMemberListFromStateBoardById('ne', boardId, 0, 1000);
		}
	}
	function onMemberRequest(success, message, data) {
		if (!$scope.board.members)
			$scope.board.members = [];
		if (success) {
			$scope.board.members.push(data);
			//updateMemberWithPersonData(data);
		}
		$scope.$apply();
	}
	function updateBoardSeats(memberListSize) {
		var seatsOpen = 0;
		if ($scope.board.seats === -1) { // no seat limit
			$scope.board.seatLimit = seatsOpen = 'OPEN';
		} else if (!isNaN(memberListSize) && !isNaN($scope.board.seats)) {
			var diff = $scope.board.seats - memberListSize;
			$scope.board.seatLimit = $scope.board.seats;
			if (diff > 0)
				seatsOpen = diff;
		}
		$scope.board.seatsOpen = seatsOpen;



		$scope.$apply();
	}
	
	// tie up API callbacks
	api.onBoardRequest = onBoardRequest;
	api.onBoardSeatListRequest = onBoardSeatListRequest;
	api.onBoardMemberListRequest = onBoardMemberListRequest;
	api.onMemberRequest = onMemberRequest;

	// TODO: pull state from URL params
  	api.getBoardFromStateWithId('ne', boardId);
});

