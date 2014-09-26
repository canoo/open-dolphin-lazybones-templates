angular.module('app').controller('DemoCtrl', function($scope, ODAPI, dolphin) {

	$scope.handleGreetClick = function (data) {
		dolphin.send(ODAPI.COMMAND_GREET);
	};

});

