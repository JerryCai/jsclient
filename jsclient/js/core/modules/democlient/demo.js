//make sure just execute and register once for sometime multi-load
var demoAPIs = demoAPIs || ( function() {

		// dependance client.js , for global navbar management
		client.register({
			name : 'demoAPIs',

			actions : {
				init : function() {
					var callParams = {
						host : 'https://demo-111111.com',
						title : 'Jerry Demo Session',
						password : 'password4demo',
						startTime : '2013-10-25T07:30:06.000Z',
						token : 'DEMOAAABQe3yrX8AAHCACEe5Aormr6j8D'
					};
					client.demofacade.foo(callParams);
				},
				destroy : function() {

				}
			}
		});

	}());
