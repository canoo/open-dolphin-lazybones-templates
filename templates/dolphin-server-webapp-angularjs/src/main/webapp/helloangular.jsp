<!DOCTYPE html>
<html>
<head>
    <title></title>

	<link rel="stylesheet" href="libs/bootstrap/bootstrap-3.1.1-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="libs/bootstrap/bootstrap-3.1.1-dist/css/bootstrap-theme.min.css">

	<script type="text/javascript" src="libs/angularjs/1.2.21/angular.min.js"></script>
    <script src="js/dolphin/opendolphin.js"></script>

	<script type="text/javascript" src="js/dolphin/ng-opendolphin.js"></script>

	<script type="text/javascript" src="js/app/api.js.jsp"></script>
	<script type="text/javascript" src="js/app/app.js"></script>

	<script type="text/javascript" src="js/app/DemoCtrl.js"></script>

	<script>

		angular.element(document).ready(function() {

            angular.bootstrap(document, ['app']);

		});
	</script>


</head>

<body>

<div style="margin-top: 2em" class="container" role="main" ng-controller="DemoCtrl">
	<input type="text" ng-model="appGlobals.name">
	<button id="greetButton" class="btn btn-primary" ng-click="handleGreetClick()">Greet</button>
	<h1><span id="greetingLabel" class="label label-primary label-success">{{appGlobals.greeting}}</span></h1>
</div>

</body>
</html>
