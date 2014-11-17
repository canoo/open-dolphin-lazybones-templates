angular.module('app', ['OpenDolphin']);

angular.module('app').config(function ($dolphinConfigProvider) {
	$dolphinConfigProvider.configure(readDolphinConfig());
});


angular.module('app').run( function($rootScope, dolphin, ODAPI, dolphinNgBinder) {

	$rootScope.appGlobals = {
		name: "",
		greeting: ""
	};

	dolphin.send(ODAPI.COMMAND_INIT, {

		onFinished: function(pms) {

			dolphinNgBinder.bind($rootScope, 'appGlobals', 'name', ODAPI.PM_ID, ODAPI.ATT_NAME);
			dolphinNgBinder.bind($rootScope, 'appGlobals', 'greeting', ODAPI.PM_ID, ODAPI.ATT_GREETING);
		}
	});

});
