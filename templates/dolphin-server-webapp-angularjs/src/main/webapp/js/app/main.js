var app = angular.module('app', []);

app.controller('DemoCtrl', function($scope, $timeout) {

	$scope.init = function()
	{
		console.log("controller.init");
	};

	$scope.name = "Duke";
	$scope.greeting = "unchanged";

	$scope.handleGreetClick = function (data) {
        console.log("greet clicked ");
        console.log(data);
        globalDolphin.send(constants.COMMAND_GREET);
    };

	$scope.bindPM = function(ngModelName, pmId, attrName) {
		$scope.$watch(ngModelName, function(newVal, oldVal) {
			console.log("ddd: ", oldVal, " -> ",  newVal);

			if (globalDolphin) {
				var pm = globalDolphin.getAt(pmId);
				if (pm) {
					var attr = globalDolphin.getAt(pmId).getAt(attrName);
					if (attr) {
						attr.setValue(newVal);
					}
					else {
						console.log("ERROR: cannot find attribute: ", attrName, " on pm: ", pmId)
					}
				}
				else {
					console.log("ERROR: cannot find pm: ", pmId)
				}
			}

			// Bind value of attribute to ng-model:
			globalDolphin.getAt(pmId).getAt(attrName).onValueChange(function (event) {
				console.log("dolphin model changed: ", event);
				if (event.newValue === null) {
					console.log("newValue is null");
					return;
				}
				if (event.newValue === event.oldValue) {
					console.log("values are the same");
					return;
				}
				if (event.newValue === $scope[ngModelName]) {
					console.log("dolphin and ng-model are the same");
					return;
				}
				$timeout(function() { // prevent nested apply problem. See https://docs.angularjs.org/error/$rootScope/inprog?p0=$apply
					$scope[ngModelName] = event.newValue;
				}, 0, true);
			});

		});

	};

	$scope.bindPM('name', 'org.group.ApplicationConstants.APP', 'ATT_NAME');
	$scope.bindPM('greeting', 'org.group.ApplicationConstants.APP', 'ATT_GREETING');

});





