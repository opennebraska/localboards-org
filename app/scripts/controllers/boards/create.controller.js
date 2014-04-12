'use strict';

angular.module('localboardsApp')
  .controller('BoardsCreateCtrl', function ($scope) {
  	var api = new $.LocalBoardsAPI();

  	// setup form validation requirements
  	$scope.requiredText = '*';

  	// title validation
  	$scope.titleRegex = /^.*$/; // allow anything for now ... will restrict later (including API-side validation)
  	$scope.titleMessage = 'Name must be [...] ';
  	
  	// seats validation
  	$scope.seatsMin = '0';
  	$scope.seatsMax = '1000000';
  	$scope.seatsInvalidRangeMessage = 'Range must be within ' + $scope.seatsMin + ' - ' + $scope.seatsMax;

	function createBoardCallback(success, message, data) {
		debugger;
	}

	$scope.create = function() { 
		// do validations first
		if (! this.board || ! this.board.title) {
			// do not finish, show warnings
			return;
		}
		if (! this.board.seats && ! this.board.openSeats) {
			alert('no seats defined');
			return;
		}

		// structure data (if applicable)
		if (this.board.openSeats)
			this.board.seats = -1; // -1 represents OPEN - should be documented in API (or maybe via flag)
		this.board.created_at = new moment().format('MM/DD/YYYY HH:mm:ss');
		this.board.updated_at = new moment().format('MM/DD/YYYY HH:mm:ss');

		debugger;

		// tie in API callback
		api.onCreateBoardRequest = createBoardCallback;
		// post the board
		api.createBoard('ne', this.board);

	};
});