var menuCount = 0;
var i = 1;
var contentNavMenu = [];
var mainNavIsHidden = false;
var newPage = false;

var dashboardMenu = "<li class='selected'>My Guide</li><li>On TV</li><li>On Demand</li><li>Search</li><li>Settings</li>";

var gridFilterMenu = "<li class='home'>Home</li><li>All Channels </li><li>Most Watched</li><li>Favorites</li><li>Premium</li><li>HD Channels</li></ul><ul id='menuListFilters'><h4>Filters</h4><p>Genres On | Off</p>";

var onDemandFilterMenu = "<li class='home'>Home</li><li>Bravo</li><li>AMC</li><li>Comedy Central</li><li>Disney</li><li>Esquire</li><li>Fuel</li><li>G2</li>";

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var keyCode = evt.keyCode;
    if (keyCode >= 37 && keyCode <= 40) {
        return false;
    }
};

function initContentNavItems(){

	contentNavMenu = new Array();

	contentNavMenu[0] = '#menuList';
    contentNavMenu[1] = '#contentCol1';
    contentNavMenu[2] = '#contentCol2';
    contentNavMenu[3] = '#contentCol3';
    contentNavMenu[4] = '#contentCol4';
	
	menuItems = new Array();
    
    menuItems[1] = $('#contentItem1');
    menuItems[2] = $('#contentItem2');
    menuItems[3] = $('#contentItem3');
    menuItems[4] = $('#contentItem4');
    menuItems[5] = $('#contentItem5');

    
}

function mainNavHandler(e){

	var moveOverlay = 0;
	var isFilterMenu = false;

	initContentNavItems();

	Mousetrap.bind('down', function(){
		i++;

		if(isFilterMenu){

			$('#menuBarOverlay').animate({width: "0%"}, 500, function(){
				$('#menuBarOverlay').css("top", moveOverlay + "px").html('<div></div>'); 
				$('li.selected').next().addClass('selected').removeClass('menuItem');
				$('li.selected').prev().addClass('menuItem').removeClass('selected');
				isFilterMenu = false;
			});

		} else {

			$('li.selected').next().addClass('selected').removeClass('menuItem');
			$('li.selected').prev().addClass('menuItem').removeClass('selected');

		}

	});
	
	Mousetrap.bind('up', function(){
		i--;
		moveOverlay -= 50;

		if(isFilterMenu){
			
			$('#menuBarOverlay').animate({width: "0%"}, 500, function(){
				$('#menuBarOverlay').css("top", moveOverlay + "px");
				$('li.selected').prev().addClass('selected').removeClass('menuItem');
				$('li.selected').next().addClass('menuItem').removeClass('selected');
				isFilterMenu = false;
			});

		} else {

			$('li.selected').prev().addClass('selected').removeClass('menuItem');
			$('li.selected').next().addClass('menuItem').removeClass('selected');

		}
		
		
	});

	Mousetrap.bind('right', function(){

		if (isFilterMenu && !newPage){
			//console.log('initiate filter menu');
		} else if(!newPage) {
			menuCount++;
			i = 1;
			$(contentNavMenu[menuCount]).focus(contentNavHandler());
			$('li.selected').removeClass('selected');
			menuItems[1].addClass('selected');
		}

		if(!mainNavIsHidden && newPage){
			console.log('hide nav');
			$('#menuContainer').animate({marginLeft: "-=23%"}, 500);
			$('.currScreen').animate({left: '0%'}, 500, function(){ 
				$('#menuTab').toggle();
			});
			mainNavIsHidden = true;

		} 

	});

	Mousetrap.bind('left', function(){
		//initiate filter menu
		if(!mainNavIsHidden && !newPage){
			if (!isFilterMenu){
				var overlayPos = $('.selected').position().top;
				isFilterMenu = true;

				switch (i){
					case 1:
						$('#menuBarOverlay').css({top: overlayPos + "px"});
						$('#menuBarOverlay').animate({width: "100%"}, 500);
						$('#menuBarOverlay').html('<div id="filterMenu"><ul><li>Jane</li><li>Jimmy</li><li>Bill</li></ul></div>');
					break;

					case 2:
						$('#menuBarOverlay').css({top: overlayPos + "px"});
						$('#menuBarOverlay').animate({width: "100%"}, 500);
						$('#menuBarOverlay').html('<div id="filterMenu"><ul><li>My Guide</li><li>Favorite Channels</li></ul></div>');
					break;

					case 3:
						$('#menuBarOverlay').css({top: overlayPos + "px"});
						$('#menuBarOverlay').animate({width: "100%"}, 500);
						$('#menuBarOverlay').html('<div id="filterMenu"><ul><li>Quick Link 1</li><li>Quick Link 2</li><li>Quick Link 3</li></ul></div>');
					break;

				}

			
			} else {
				$('#menuBarOverlay').animate({width: "0%"}, 500, function(){
					$('#menuBarOverlay').html('<div></div>'); 
					isFilterMenu = false;
				});

			}

		}  else if(mainNavIsHidden && newPage){
			
			$('#menuContainer').animate({marginLeft: '+=23%'}, 500);
			$('.currScreen').animate({left: '22%'}, 500);
			mainNavIsHidden = false;
			
			i = 1;
			$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected').removeClass('menuItem');

			$('#menuTab').toggle();
		
		} 
		
		
	})

	Mousetrap.bind('enter', function(){
		if(!mainNavIsHidden){


			if (i==2){
				if(isFilterMenu){
					$('#menuBarOverlay').animate({width: "0%", opacity: 0}, 'fast');
				}
				
				$('#menuContainer').animate({marginLeft: "-=23%"}, 500);
				$('.currScreen').animate({opacity: 0, left: '-200%'}, 500, function(){
					//swap menus
					if(newPage){
						if(i==2){
							$('#menuList').html(gridFilterMenu);
							$('#appShell').append('<div id="menuTab"></div>');
						}

						if(i==3){
							$('#menuList').html(onDemandFilterMenu);
							$('#appShell').append('<div id="menuTab"></div>');
						}
					}
				}).removeClass('currScreen');

				$('#contentContainer').animate({left: '5%', width: '100%'}, 500, function(){
					$('#listingsGrid').animate({left: '0%'}, 200).addClass('currScreen');

				});

				newPage = true;
				mainNavIsHidden = true;

			} 

			
		} 

		if (newPage){
			console.log('go back');
			
			if (i==1){
				$('#listingsGrid').animate({left: '300%'}, 200).removeClass('currScreen');
				$('#dashboard').animate({opacity: 1, left: '20%'}, 500).addClass('currScreen');
				$('#menuList').html(dashboardMenu);

				newPage = false;
				
			}
		}

		
	});

	

}

function scrollContentLeft(){
		
		var menuPos = $(contentNavMenu[menuCount]).position().left;
		
		
		var contentWidth = $('.selected').width();

		if ((i > 0) && (i < 5)){
			$(contentNavMenu[menuCount]).animate({ 
				"left" : "-=" + contentWidth + "px"
			}, "slow" );
		}

}

function scrollContentRight(){
		
		var menuPos = $(contentNavMenu[menuCount]).position().left;
		var contentPos = $('#contentNav').position().top;
		var contentWidth = $('.selected').width();

		if (i == 0){
			i = 1;
			menuCount = 0;
			$('div.selected').removeClass('selected');
			$('#menuList').focus(mainNavHandler());
			$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected').removeClass('menuItem');
			
			if(contentPos < 0){
				$('#contentNav').animate({ 
				"top" : 0
			}, "slow" );
			}
			

		} else if(menuPos < 0){
			
			$(contentNavMenu[menuCount]).animate({ 
				"left" : "+=" + contentWidth + "px"
			}, "slow" );

		}

}


function scrollContentDown(){
		
		var contentPos = $('#contentNav').position().top;
		var colHeight = $(contentNavMenu[menuCount]).height();
			$('#contentNav').animate({ 
				"top" : "-=" + colHeight + "px"
			}, "slow" );
}

function scrollContentUp(){
		
		var contentPos = $('#contentNav').position().top;
		var colHeight = $(contentNavMenu[menuCount]).height();

		console.log(contentPos);

		if (menuCount < 1){
			$('#contentNav').animate({ 
				scrollTop : 0
			}, "slow" );
		} else if(contentPos < 0){

			$('#contentNav').animate({ 
				"top" : "+=" + colHeight + "px"
			}, "slow" );

		}
		
}

function contentNavHandler(e){

	initContentNavItems();
	$('#menuList').unbind(mainNavHandler());

	var next = 1;
	var prev;
	console.log(menuCount);

	Mousetrap.bind('down', function(){
		console.log(menuCount);

		if (menuCount < (contentNavMenu.length) - 1){
			$('div.selected').removeClass('selected');
			menuCount++;

			i = 1;

			$(contentNavMenu[menuCount]).focus(contentNavHandler());
			$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected');
		
			$(contentNavMenu[menuCount -1]).animate({
				"left" : 0
			}, "slow");

		scrollContentDown();
		} 


	});
	
	Mousetrap.bind('up', function(){
		
		menuCount--;
		i = 1;
		
		$(contentNavMenu[menuCount]).focus(contentNavHandler());
		$('.selected').removeClass('selected');

		if (menuCount == 0){
			$('#contentNav').animate({ 
				top: 0
			});
			
			$('#menuList').focus(mainNavHandler());
		}

		$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected').removeClass('menuItem');
		
		$(contentNavMenu[menuCount + 1]).animate({
			"left" : 0
		}, "slow");

		scrollContentUp();



	});

	Mousetrap.bind('left', function(){
		next--;
		prev = next + 1;

		$('div.selected').prev().addClass('selected');
		$('div.selected').next().removeClass('selected');

		i--;

		scrollContentRight();



	});

	Mousetrap.bind('right', function(){
		next++;
		prev = next - 1;

		$('div.selected').next().addClass('selected');
		$('div.selected').prev().removeClass('selected');

		i++; 

		scrollContentLeft()

	});



}

