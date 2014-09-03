<!DOCTYPE html>
<html>
<head>
    <title></title>

	<link rel="stylesheet" href="bootstrap/bootstrap-3.1.1-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="bootstrap/bootstrap-3.1.1-dist/css/bootstrap-theme.min.css">

	<script type="text/javascript" src="libs/angularjs/1.2.21/angular.min.js"></script>
	<script type="text/javascript" src="js/app/main.js"></script>

    <!-- refer to OpenDolphin, see also http://open-dolphin.org/dolphin_website/Download.html -->
    <script data-main="js/dolphin/" src="libs/require.js"></script>

	<script>
		var globalDolphin;

		angular.element(document).ready(function() {

			require([ 'opendolphin' ], function (dol) {
				// Set up the dolphin for client-side only mode (first parameter url is null)
				// and not forcing a new session on page reload (irrelevant for client side only mode):
				globalDolphin = dol.dolphin(null, false);

				// Make an attribute with name, no qualifier, and an empty String as initial value:
				const attribute = globalDolphin.attribute("myAttribute", undefined, "");

				// ... and put it into a presentation model with id 'myPM' and no type
				var pm = globalDolphin.presentationModel("myPM", undefined, attribute);

				angular.bootstrap(document, ['app']);

			});

		});
	</script>


</head>

<body ng-controller="DemoCtrl">

<input type="text" ng-model="firstName">
<h1>AngularJS Model: {{firstName}}</h1>

<button ng-click="appendLonger()">add 'longer' to PM</button>

</body>
</html>
