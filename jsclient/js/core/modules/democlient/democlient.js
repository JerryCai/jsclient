//Usage demo if you want to write RESTful API client like this
var DemoClient = DemoClient || ( function(undefined) {

		var globalConfigs = {};

		var openAPIs = {};

		function _buildMeetingApiPath(apiPath) {
			return globalConfigs["urlPrefix"] + globalConfigs["version"] + apiPath;
		};

		// dependance client.js and json_api_client.js
		client.register({
			name : 'DemoClient',

			actions : {
				init : function() {

					globalConfigs["target"] = "https://default.com";
					globalConfigs["urlPrefix"] = "/demo/";
					globalConfigs["version"] = "v1";
				},

				execute : function(request) {
					request["apiPath"] = _buildMeetingApiPath(request["apiPath"]);
					client.JsonApiClient.execute(request);
				},
				registerAPI : function(apiName, fn) {
					openAPIs[apiName] = fn;
				},

				api : openAPIs,

				destroy : function() {
					globalConfigs = null;
					openAPIs = null;
				}
			}

		});

	}());
