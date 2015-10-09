<!DOCTYPE html>
<html>
<head>
    <title></title>

    <link rel="stylesheet" href="webjars/bootstrap/3.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="webjars/bootstrap/3.3.1/css/bootstrap-theme.min.css">

	<script type="text/javascript" src="webjars/angularjs/${ANGULAR_JS_VERSION}/angular.min.js"></script>
    <script type="text/javascript" src="webjars/org/opendolphin/${OPEN_DOLPHIN_JS_VERSION}/opendolphin.js"></script>
	<script type="text/javascript" src="webjars/org/opendolphin/${OPEN_DOLPHIN_NG_VERSION}/opendolphin-ng.js"></script>

	<script type="text/javascript" src="js/app/api.js.jsp"></script>
	<script type="text/javascript" src="js/app/app.js"></script>

	<script type="text/javascript" src="js/app/DemoCtrl.js"></script>

</head>

<body ng-app="app">

<div style="margin-top: 2em" class="container" role="main" ng-controller="DemoCtrl">
	<input type="text" ng-model="appGlobals.name">
	<button id="greetButton" class="btn btn-primary" ng-click="handleGreetClick()">Greet</button>
	<h1><span id="greetingLabel" class="label label-primary label-success">{{appGlobals.greeting}}</span></h1>
</div>

</body>
</html>
