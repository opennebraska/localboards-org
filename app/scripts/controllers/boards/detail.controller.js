'use strict';

angular.module('localboardsApp')
  .controller('BoardsDetailCtrl', function ($scope, $routeParams) {

  	shared_showLoader();

  	var api = new $.LocalBoardsAPI();
  	var boardId = $routeParams.boardId;

  	function onBoardRequest(success, message, data) {
		if (success) {
			$scope.board = data.data;
			$scope.board.title = shared_toTitleCase($scope.board.title);
			$scope.board.openings = parseBoardOpenings();
			$scope.$apply();
			api.getBoardSeatListFromStateBoardById('ne', data.data.id, 0, 1000);
		}
	}
	function onBoardMemberListRequest(success, message, data) {
		if (!$scope.board.members)
			$scope.board.members = [];
		var memberListSize = 0;
		if (success) {
			$.each(data, function() {
				var self = this;
				var match = $.grep($scope.board.memberSeats, function (e) { return self.board_seat_id === e.id });
				if (match.length === 1) {
					this.title = match[0].title;
				}
				$scope.board.members.push(this);
				api.getMemberFromStateById('ne', this.id);
			});
			memberListSize = data.length;
		}
		updateBoardSeats(memberListSize);
		shared_hideLoader();
	}
	function onBoardSeatListRequest(success, message, data) {
		if (!$scope.board.memberSeats)
			$scope.board.memberSeats = [];
		if (success) {
			$.each(data, function() {
				$scope.board.memberSeats.push(this);
			});
			api.getBoardMemberListFromStateBoardById('ne', boardId, 0, 1000);
		}
	}
	function onMemberRequest(success, message, data) {
		if (!$scope.board.people)
			$scope.board.people = [];
		if (success) {
			// loop at memberList until we find a match on memberList.Id = data.Id
			// then add extra fields from member into 
			var person = data;
			$scope.board.people.push(person);
			//updateMemberWithPersonData(data);
		}
	}
	function parseBoardOpenings() {
		var rval = [];
		if ($scope.board.next_opening && $scope.board.next_opening_qual)
		{
			var openingArr = $scope.board.next_opening.split('|');
			var openingQualArr = $scope.board.next_opening_qual.split('|');
			for (var i = 0; i < $scope.board.next_opening.length; i++) {
				if (openingArr[i] && openingQualArr[i])
					rval.push({opening: openingArr[i], qualifications: openingQualArr[i]});
			}
			return rval;
		} else {
			return null;
		}
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

