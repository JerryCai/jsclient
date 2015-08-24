/*!
2013-10-25
(c) 2013 Jerry Cai - nwwh@qq.com
all rights reserved .

@dependance -- ../client.js
*/

//make sure just execute and register once for sometime multi-load
var navbar = navbar || ( function(){

// dependance client.js , for global navbar management
client.register({
	name : 'navbar',
	actions : {
		init : function() {
			//write the basic navbar architecture when init
			var navElement = $('<nav></nav>').prependTo(document.body)
				.attr('id', 'global-navbar')
				.addClass('navbar navbar-default navbar-static-top')
				.attr('role', 'navigation');
				
			var navHeaderElement = $('<div></div>').appendTo(navElement)
				.attr('id', 'global-navbar-header')
				.addClass('navbar-header');
				
			var headerToggleBtnElement = $('<button></button>').appendTo(navHeaderElement)
				.attr('type','button')
				.addClass('navbar-toggle')
				.attr('data-toggle','collapse')
				.attr('data-target','.navbar-ex1-collapse');
				
			var navbarBrandElement = $('<a></a>').appendTo(navHeaderElement)
				.addClass('navbar-brand');
			
			$('<span></span>').appendTo(headerToggleBtnElement)
					.addClass('sr-only')
					.text('unfolder');
			for(i=0 ; i<3 ; i++){
				$('<span></span>').appendTo(headerToggleBtnElement)
					.addClass('icon-bar');
			}
			
			//div class="collapse navbar-collapse navbar-ex1-collapse">
			var collapseNavElement = $('<div></div><!-- /.navbar-collapse -->').appendTo(navElement)
				.attr('id', 'collapse-nav')
				.addClass('collapse navbar-collapse navbar-ex1-collapse');
				
			//<ul class="nav navbar-nav">
			var leftBarElement = $('<ul></ul>').appendTo(collapseNavElement)
				.attr('id', 'collapse-nav-left')
				.addClass('nav navbar-nav');
				
			//<ul class="nav navbar-nav navbar-right">
			var rightBarElement = $('<ul></ul>').appendTo(collapseNavElement)
				.attr('id', 'collapse-nav-right')
				.addClass('nav navbar-nav navbar-right');
			
			//load the nav-plugin content below:
			for(item in NavContent){
				var menuItems = NavContent[item];
				switch(item){
					case 'navbar-brand' : {
						navbarBrandElement.attr('href',menuItems.href);
						navbarBrandElement.text(menuItems.name);
						break;
					}
					case 'activeMenuId':{
						break;
					}
					case 'navbar-left' : {
						_writeTopMenus(leftBarElement,menuItems);
						break;
					}
					case 'navbar-right' : {
						_writeTopMenus(rightBarElement,menuItems);
						break;
					}
					case 'search':{
						_writeSearch(collapseNavElement ,menuItems);
						break;
					}
					default : {
						throw new Error("your nav_plugin.js --NavContent item ["+item+"]doesn't support by navbar framework");
					}
				}
				
			}
			
			//register active feature
			_handlerMenuActive();
			_setMenuActive(NavContent.activeMenuId);
		} 
		,
		setMenuActive : function(id){
			_setMenuActive(id);
		}
		,
		destroy : function() {

		}
	},
}); 

			// utils interal api, all of out of actions scope api are not be registed to client
function _writeTopMenus(parentDiv , menuItems) {
	    for (item in menuItems) {
	        switch (item) {
	        case 'menus':
	            {
	                _writeMenus(parentDiv, menuItems[item]);
	                break;
	            }
	        case 'dropdown':
	            {
	                _writeDropdown(parentDiv, menuItems[item]);
	                break;
	            }
	        default:
	            {
	                throw new Error("your nav_plugin.js -- item [" + item + "]doesn't support by navbar framework");
	            }
	        }
	    }
};
	
function _writeMenus(parentDiv, menus) {
	
	    for (i = 0; i < menus.length; i++) {
	        menu = menus[i];
	        switch (menu.type) {
	        case 'menu':
	            {
	                _writeMenu(parentDiv, menu);
	                break;
	            }
	        case 'dropdown':
	            {
	                var dropdownElement = _writeDropdown(parentDiv, menu);
	                _writeMenus(dropdownElement, menu.menus);
	                break;
	            }
	        case 'search':
	            {
	            	_writeSearch(parentDiv,menus);
	                break;
	            }
	        default:
	            {
	                throw new Error('The menu.type =[' + menu.type + ']do not supprted by navbar , please check nav_plugin.js');
	            }
	        }
	
	    }
};
	
function _writeSearch(parentDiv, search) {
		var formElement = $('<form></form>').appendTo(parentDiv)
				.addClass('navbar-form')
				.attr('role','search');
				
		var divElement = $('<div></div>').appendTo(formElement)
				.addClass('form-group');
		$('<input>').appendTo(divElement)
				.attr('type','text')
				.addClass('form-control')
				.attr('placeholder',search.placeholder);
				
		var btnElement = $('<button></button>').appendTo(formElement)
				.attr('type','submit')
				.addClass('btn btn-default')
				.append('<span class="glyphicon glyphicon-search"></span>');
};
	
	/**
	 *write item element to parentDiv and return itself to nest call
	 */
	
function _writeMenu(parentDiv, menu) {
	    var liElement = $('<li></li>').appendTo(parentDiv)
	    	.attr('id',_getNavMenuId(menu.id));
	    var menuElement = $('<a></a>').appendTo(liElement)
	        .text(menu.name);
	    if(menu.action){
	    	menuElement.attr('href',"javascript:void(0)");
	    	menuElement.on('click',function(e){
	        	menu.action();
	        });
	    }else{
	    	menuElement.attr('href', menu.href);
	    }
	    return liElement;
	};
	
function _getNavMenuId(id){
		return 'nav_menu_'+id;
};
	
	
function _writeDropdown(parentDiv, dropdownItem) {
	    var dropdownElement = $('<li></li>').appendTo(parentDiv)
	        .addClass('dropdown');
	    var internalA = $('<a></a>').appendTo(dropdownElement)
	        .attr('href', dropdownItem.href)
	        .addClass('dropdown-toggle')
	        .attr('data-toggle', 'dropdown')
	        .text(dropdownItem.name);
	    $('<b></b>').appendTo(internalA).addClass('caret');
	
	    var dropdownMenusElement = $('<ul></ul>').appendTo(dropdownElement);
	    dropdownMenusElement.addClass('dropdown-menu dropdown-menu-wrapper');
	
	    return dropdownMenusElement;
};
	
function _handlerMenuActive (){
		$('.navbar li').click(function(e) {
			$('.navbar li').removeClass('active');
			var $this = $(this);
			if (!$this.hasClass('active')) {
				$this.addClass('active');
			}
			e.preventDefault();
		});
};
	
function _setMenuActive(id){
		$('.navbar li').removeClass('active');
		var idSelector = '#'+_getNavMenuId(id);
		$(idSelector).addClass('active');	
};
}());