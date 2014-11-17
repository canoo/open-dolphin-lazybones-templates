angular.module('OpenDolphin', []);

angular.module('OpenDolphin').provider('$dolphinConfig', function() {

	var $cfg = {};
	this.configure = function (cfg) {
		$cfg = cfg;
	};

	this.$get = function () {
		return $cfg;
	};

});

angular.module('OpenDolphin').factory('dolphin', function(dol, $dolphinConfig) {
	return dol.dolphin($dolphinConfig.DOLPHIN_URL, true);
});

angular.module('OpenDolphin').factory('ODAPI', function(dol, $dolphinConfig) {
	return $dolphinConfig.ODAPI
});	

angular.module('OpenDolphin').factory('dolphinNgBinder', function($timeout, dolphin) {

	return {
		withAttribute: function(pmId, attrName, f) {
			if (dolphin) {
				var pm = dolphin.getAt(pmId);
				if (pm) {
					var attr = dolphin.getAt(pmId).getAt(attrName);
					if (attr) {
						console.log("withAttribute: found attribute " + attrName);
						f(attr);
					}
					else {
						console.log("ERROR: cannot find attribute: ", attrName, " on pm: ", pmId)
					}
				}
				else {
					console.log("ERROR: cannot find pm: ", pmId)
				}
			}
		},

		bind: function(scope, ngModelName, propertyName, pmId, attrName) {
			this.initScopeFromPMs(scope, ngModelName, propertyName, pmId, attrName);
			var that = this;
			$timeout(function() {
				that.bindOnly(scope, ngModelName, propertyName, pmId, attrName);
			}, 0, true);

		},

		initScopeFromPMs: function(scope, ngModelName, propertyName, pmId, attrName) {

			var copyAttributeValueToScope = function(attr) {
				console.log("copyAttributeValueToScope");
				console.log("copyAttributeValueToScope: in timeout of: " + propertyName);
				if (propertyName) {
					console.log("setting scope to " + attr.value);
					scope[ngModelName][propertyName] = attr.value;
				}
				else {
					scope[ngModelName] = attr.value;
				}
			};

			this.withAttribute(pmId, attrName, copyAttributeValueToScope);

		},
		bindOnly: function(scope, ngModelName, propertyName, pmId, attrName) {

			var readModel = propertyName ? (ngModelName + '.' + propertyName) : ngModelName;

			var that = this;
			scope.$watch(readModel, function(newVal, oldVal) {
				//console.log("ng-model changed: ", oldVal, " -> ",  newVal);
				that.withAttribute(pmId, attrName, function(attr){
					attr.setValue(newVal);
				});


				// Bind value of attribute to ng-model:
				dolphin.getAt(pmId).getAt(attrName).onValueChange(function (event) {
					var scopeValue = propertyName ? (scope[ngModelName][propertyName]) : scope[ngModelName];
					console.log("dolphin model changed: ", event);
					if (event.newValue === null) {
						//console.log("newValue is null");
						return;
					}
					if (event.newValue === event.oldValue) {
						//console.log("values are the same");
						return;
					}
					if (event.newValue === scopeValue) {
						//console.log("dolphin and ng-model are the same");
						return;
					}
					$timeout(function() { // prevent nested apply problem. See https://docs.angularjs.org/error/$rootScope/inprog?p0=$apply
						//console.log('applying change to ng');
						if (propertyName) {
							scope[ngModelName][propertyName] = event.newValue;
						}
						else {
							scope[ngModelName] = event.newValue;
						}
					}, 0, true);
				});

			});


		}
	};

});

