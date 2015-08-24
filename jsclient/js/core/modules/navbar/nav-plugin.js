var NavContent = NavContent || {
	'navbar-brand' : {
		name : 'Jerry Cai',
		icon : '/img/',
		href : 'http : //xxx.xx',
		actions : function() {
		}
	},

	'activeMenuId' : 1,

	'navbar-left' : {
		menus : [{
			id : 1,
			type : 'menu',
			name : 'Hello',
			icon : '',
			href : '',
			action : function() {
				alert('hello world!');
			}
		}, {
			id : 2,
			type : 'menu',
			name : 'menu2',
			icon : '',
			href : '',
			action : function() {
			}
		}, {
			id : 3,
			type : 'menu',
			name : 'menu_3',
			icon : '',
			href : '',
			action : function() {
			}
		}, {
			id : 4,
			type : 'dropdown',
			name : 'more',
			icon : '',
			menus : [{
				id : 41,
				type : 'menu',
				name : 'menu_1',
				icon : '',
				href : '',
				action : function() {
				}
			}, {
				id : 42,
				type : 'menu',
				name : 'menu_2',
				icon : '',
				href : '',
				action : function() {
				}
			}, {
				id : 43,
				type : 'menu',
				name : 'menu_3',
				icon : '',
				href : '',
				action : function() {
				}
			}]
		}]
	},

	'navbar-right' : {
		menus : [{
			id : 5,
			type : 'menu',
			name : 'menu_1',
			icon : '',
			href : '',
			action : function() {
			}
		}, {
			id : 6,
			type : 'menu',
			name : 'menu_2',
			icon : '',
			href : '',
			action : function() {
			}
		}, {
			id : 7,
			type : 'menu',
			name : 'menu_3',
			icon : '',
			href : '',
			action : function() {
			}
		}, {
			id : 8,
			type : 'dropdown',
			name : 'more',
			icon : '',
			menus : [{
				id : 81,
				type : 'menu',
				name : 'menu_1',
				icon : '',
				href : '',
				action : function() {
				}
			}, {
				id : 82,
				type : 'menu',
				name : 'menu_2',
				icon : '',
				href : '',
				action : function() {
				}
			}, {
				id : 83,
				type : 'menu',
				name : 'menu_3',
				icon : '',
				href : 'http://www.baidu.com'
				,
				action : function() {
				alert('congts , you find me success!');
				}
			}]
		}]
	},
	search : {
		placeholder : 'search',
		action : function() {
		}
	}
};
