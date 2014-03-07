//you can implemention each api one by one base on democlient.js like this 
var foo = foo || client.DemoClient.registerAPI("foo", 

function(host , title , password , startTime ,token) {

	var request = {
		"method" : "POST",
		"host" : host,
		"apiPath" : "/foo",
		"querys" : {
			"token" : token
		},
		"headers" : {
		},
		"data" : {
			"host" : {
				"userId" : "UXXXXXX"
			},
			"title" : title,
			"password" : password,
			"location" : "Hefei City",
			"schedule" : {
				"startTime" : startTime,
				"duration" : 100,
				"recurrence" : "RRULE:FREQ\u003dDAILY;COUNT\u003d3;INTERVAL\u003d3",
			},
			"invites" : [{
				"invitee" : {
					"userId" : "UBBBBBBBBBBB"
				},
				"role" : "role1"
			}, {
				"email" : "jerrycai.cn@gmail.com",
				"role" : "owner"
			},{
				"email" : "nwwh@qq.com",
				"role" : "owner"
			}]
		},
		"successCallback" : function(data, textStatus, jqXHR) {
			alert("call foo success : get its url is "+data["url"]);
			return data["id"];
		},
		"errorCallback" : function(jqXHR, textStatus, errorThrown) {
			alert("call foo failed as :" + textStatus + errorThrown);
		}
	};

	client.DemoClient.execute(request);
})
