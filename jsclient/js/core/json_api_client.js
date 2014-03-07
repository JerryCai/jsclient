//Usage demo if you want to write Json RESTful API client like this
var JsonApiClient = JsonApiClient || ( function($, undefined) {
		var globalConfigs = {};

		function _buildURL(host, apiPath, querys) {

			var url = host + apiPath;
			if (querys) {
				var i = 0;
				for (var key in querys) {
					if (null != querys[key]) {
						if (i == 0) {
							url = url + "?" + key + "=" + querys[key];
						} else {
							url = url + "&" + key + "=" + querys[key];
						}
						i++;
					}
				}
			}
			return url;
		};

		function _send(method, host, apiPath, querys, headers, data, successCallback, errorCallback) {
			url = _buildURL(host, apiPath, querys);
			$.ajax({
				type : method,
				url : url,
				timeout : globalConfigs["requestTimeout"],
				cache : false,
				processData : true,
				crossDomain : true,
				data : JSON.stringify(data,null,4),
				headers : headers,
				contentType : "application/json;charset=UTF-8",
				dataType : "json",
				beforeSend : function(jqXHR) {
				},
				success : function(data, textStatus, jqXHR) {
					successCallback(data, textStatus, jqXHR);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					errorCallback(jqXHR, textStatus, errorThrown);
				}
			});
		}

		// dependance client.js , for global navbar management
		client.register({
			name : 'JsonApiClient',

			actions : {
				init : function() {
					globalConfigs["requestTimeout"] = 60000 * 200;
				},

				execute : function(request) {
					var method = request["method"];
					var host = request["host"];
					if (!host) {
						host = "";
					}
					var apiPath = request["apiPath"];
					var querys = request["querys"];
					var headers = request["headers"];
					var data = request["data"];
					var successCallback = request["successCallback"];
					var errorCallback = request["errorCallback"];
					_send(method, host, apiPath, querys, headers, data, successCallback, errorCallback);
				},
				
				destroy : function() {
					globalConfigs = null;
				}
			}

		});

	}(jQuery));
