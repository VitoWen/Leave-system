leaveApp.controller('LoginCtrl', ['$scope', '$state', function ($scope, $state) {
	$scope.login = function (evt) {
		if(evt) evt.stopPropagation();
		

		$state.go('leave');
	};	
}]);