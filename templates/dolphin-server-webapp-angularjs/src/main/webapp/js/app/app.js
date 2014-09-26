angular.module('app', ['OpenDolphin']);

angular.module('app').config(function ($dolphinConfigProvider) {
	$dolphinConfigProvider.configure(readDolphinConfig());
});


angular.module('app').run( function($rootScope, dolphin, ODAPI, dolphinNgBinder) {

	var att_name = dolphin.attribute(ODAPI.ATT_NAME, undefined, "");
	var att_greeting = dolphin.attribute(ODAPI.ATT_GREETING, undefined, "");
	var pm = dolphin.presentationModel(ODAPI.PM_ID, undefined, att_name, att_greeting);

	$rootScope.appGlobals = {
		name: "Duke",
		greeting: "-"
	};

	dolphinNgBinder.bind($rootScope, 'appGlobals', 'name', ODAPI.PM_ID, ODAPI.ATT_NAME);
	dolphinNgBinder.bind($rootScope, 'appGlobals', 'greeting', ODAPI.PM_ID, ODAPI.ATT_GREETING);

});
