//provider a all api easy call facade like this 
var demofacade  = demofacade || ( function() {

		client.register({
			name : 'demofacade',

			actions : {
				init : function() {
				},
				destroy : function() {

				},
				foo : function(params) {
					client.DemoClient.api.foo(params['host'], params['title'], params['password'], params['startTime'], params['token']);
				}
			}
		});

	}());
