'use strict';

angular.module('localboardsApp')
  .controller('BoardsCreateCtrl', function ($scope, $location) {
  	var api = new $.LocalBoardsAPI();

  	// default form values
  	var board = {
  		is_active: true,
  		seats: 0,
  		alternating_seats: 0,
  		created_by_id: 'localboards-ui',
  		updated_by_id: 'localboards-ui'
  	};
  	$scope.board = board;

  	// setup form validation requirements
  	$scope.requiredText = '*';

  	// title validation
  	$scope.titleRegex = /^.*$/; // allow anything for now ... will restrict later (including API-side validation)
  	$scope.titleMessage = 'Name must be [...] ';
  	
  	// seats validation
  	$scope.seatsMin = '0';
  	$scope.seatsMax = '1000000'; // arbitrary right now
  	$scope.seatsInvalidRangeMessage = 'Range must be within ' + $scope.seatsMin + ' - ' + $scope.seatsMax;

	function createBoardCallback(success, message, data) {
		if (success) {
			$location.path( '/boards/' + data.id );
		} else { 
			// $scope.errorMessage = message; // TODO: implement something here
		}
		$scope.$apply();
	}

	$scope.create = function() { 
		// 1. do validations (if applicable)

		// 2. massage/structure data (if applicable)
		if (this.board.openSeats) {
			// -1 represents OPEN - should be documented in API (or maybe via flag)
			this.board.seats = -1;
			this.board.alternating_seats = 0;
		}

		// 3. tie in API callback
		api.onCreateBoardRequest = createBoardCallback;

		// 4. post the board
		api.createBoard('ne', this.board);

	};
});