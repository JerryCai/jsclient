/*!
 2013-10-23
 (c) 2013 Jerry Cai nwwh@qq.com
 all rights reserved .
 */

/*client is overall system level global facade namespace ,
 *any js caller and handler will start under this namespace
 *
 * just need to call client.register(object) can register your module object to client,
 *
 * then use this client as facade to start feature call
 *
 */

var client = client || {};

(function() {

	self = this;

	/**
	 *this is client auto triger api , it will auto execute by client init when document ready .
	 * @public
	 */
	self.init = function() {
		self._walker('init');
	};
	/**
	 *this is client auto triger api , it will auto execute by client destroy when needed .
	 */
	self.destroy = function() {
		self._walker('destroy');
	};

	/**
	 * all the JS api should register to client with its own namespace .
	 * @public
	 */
	self.register = function(object) {
		var namespace = object.name;
		if (self[namespace] === undefined) {
			self[namespace] = object.actions;
		} else {
			throw new Error('Try to register object with object name [' 
			+ namespace + '] has already registed , please assign another object name');
		}
		return self;
	};

	/**
	 *  public this walker interface for module designer to batch call their designed APIs.
	 * @public
	 */
	self.walker = function(methodName) {
		self._walker(methodName);
	}
	/**
	 * the _walker shouldn't be used by outside , just for internal call.
	 * @private
	 */
	self._walker = function(methodName) {
		//call each registed methods by methodName, this is only internal caller.
		for (namespace in self) {
			var method = self[namespace][methodName];
			method != undefined && $.isFunction(method) && method();
		}
	}
}).apply(client);

//client is auto loaded when document ready.
$(document).ready(function() {
	client.init();
	client.destroy();
}); 

/*
*Usage :
* 
* demo 1
* any other modules and write this regiser to provider a facade to callers.

var moduleName = moduleName || ( function(){

// you can define your register or data struct here next lever name space even .
var subAction ={};

client.register({
name : 'moduleName',
actions : {
init : function() {
// alert('nav init execute');
},
function1 : function() {
alert('nav display execute');
_privateFun1();

},

registerAction : function( actionName , actionFn){
	subAction["actionName"] = actionFn;
},
// this will allow you to call by like this : client.actions.subAction();
actions = subAction,

destroy : function() {
// alert('nav destroy execute');
}
}
});

function _privateFun1(){
//this is private function 1 which out of scope from client caller.
}
}());

* demo 2
* If you want to extends 3rd-party , like Jquery , just like this :

var moduleName = moduleName || ( function($, undefined){

// you can define your register or data struct here next lever name space even .
var subAction ={};

client.register({
name : 'moduleName',
actions : {
init : function() {
// alert('nav init execute');
},
function1 : function() {
alert('nav display execute');
_privateFun1();

},

registerAction : function( actionName , actionFn){
	subAction["actionName"] = actionFn;
},
// this will allow you to call by like this : client.actions.subAction();
actions = subAction,

destroy : function() {
// alert('nav destroy execute');
}
}
});

function _privateFun1(){
//this is private function 1 which out of scope from client caller.
}
}(jQuery);

*/

