${'<%'}@ page import="${PKG}.ApplicationConstants" ${'%>'}

<!DOCTYPE html>
<html>
<head>
    <title></title>

	<link rel="stylesheet" href="libs/bootstrap/bootstrap-3.1.1-dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="libs/bootstrap/bootstrap-3.1.1-dist/css/bootstrap-theme.min.css">

	<script type="text/javascript" src="libs/angularjs/1.2.21/angular.min.js"></script>
	<script type="text/javascript" src="js/app/main.js"></script>
	<script type="text/javascript" src="js/app/api.js.jsp"></script>

    <!-- refer to OpenDolphin, see also http://open-dolphin.org/dolphin_website/Download.html -->
    <script data-main="js/dolphin/" src="libs/require.js"></script>

	<script>
		var globalDolphin;
		var constants = readConstants();

		angular.element(document).ready(function() {

			require([ 'opendolphin' ], function (dol) {
				globalDolphin = dol.dolphin("${'<%='}application.getContextPath()${'%>'}/dolphin/", true);
				console.log("pmId: ", constants.pmId);

	            var att_name = globalDolphin.attribute("${'<%='}ApplicationConstants.ATT_NAME${'%>'}", undefined, "");
	            var att_greeting = globalDolphin.attribute("${'<%='}ApplicationConstants.ATT_GREETING${'%>'}", undefined, "");

	            var pm = globalDolphin.presentationModel("${'<%='}ApplicationConstants.PM_APP${'%>'}", undefined, att_name, att_greeting);

				angular.bootstrap(document, ['app']);

			});

		});
	</script>


</head>

<body ng-controller="DemoCtrl">

<div class="container" role="main" ng-controller="DemoCtrl">
	<input type="text" ng-model="name">
	<button id="greetButton" class="btn btn-primary" ng-click="handleGreetClick()">Greet</button>
	<h1><span id="greetingLabel" class="label label-primary label-success">{{greeting}}</span></h1>
</div>

</body>
</html>
