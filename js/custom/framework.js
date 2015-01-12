/**
 * The Viewport
 *
 * This object handle what to display and how to display it into the
 * application visibile space.
 *
 */
var Viewport = Backbone.View.extend({
    
    // target item.
    el: '#app',
    
    // display a string to the target item
    render: function( str ) {
        
        // first visualization. it creates an item with the string.
        if ( this.$('#content').length == 0 ) {
            
            // create the item with some attributes
            /*var $em = $('<div>').html( str ).css({
                background: 'yellow',
                padding: '5px',
                textAlign: 'center'
            }).hide();*/
            var $em = $('<div>').html( str ).attr({
                id: 'content'
            }).hide();

            // append the item to the view's target
            this.$el.html( '' );
            this.$el.append( $em );
            $em.fadeIn();
        
        // following visualizations. flash out the string then flash in with
        // the new value. this way the "click" trigger a visible event to the screen!
        } else {
            
            this.$('#content').stop().fadeOut(function(){
                $(this).html( str ).fadeIn();
            });
            
        }
        
    }
});

/**
 * The Menu View
 * this object handle menu actions and trigger a Router's reset action each time
 * you click to a link.
 *
 * This way you can call the same route multiple times by clicking the same link.
 */
var Menu = Backbone.View.extend({
    
    el: '#menuList',
    
    events: {
        'click a' : 'onClick',
        'x' : 'pageHandler'
    },
    
    onClick: function( e ) {
        
        // uncomment this row to make it work!
        router.navigate('/');
        
    },

    pageHandler: function(e){
        console.log('key command initiated');
    }

});

/**
 * The Router
 * it translates url requests into actions.
 *
 * Here we always throw the same action with different params.
 */
var Router = Backbone.Router.extend({
    
    // routes configuration
    routes: {
        'route/:id' : 'defaultRoute'
    },
    
    // the action. it uses global namespace's viewport object.
    defaultRoute: function( routeId ) {
       
       if (routeId == 1){
         viewport.render( '
             <div id="dashboard">
        <div id="contentNav">

            <h1>Movies</h1>
            <div id="contentCol1">
                <div id="contentItem1"><img src="res/images/content/movies1.png"></div>
                <div id="contentItem2"><img src="res/images/content/movies2.png"></div>
                <div id="contentItem3"><img src="res/images/content/movies3.png"></div>
                <div id="contentItem4"><img src="res/images/content/movies4.png"></div>
                <div id="contentItem5"><img src="res/images/content/movies5.png"></div>
            </div>

            <h1>TV Shows</h1>
            <div id="contentCol2">
                <div id="contentItem1"><img src="res/images/content/tv1.png"></div>
                <div id="contentItem2"><img src="res/images/content/tv2.png"></div>
                <div id="contentItem3"><img src="res/images/content/tv3.png"></div>
                <div id="contentItem4"><img src="res/images/content/tv4.png"></div>
                <div id="contentItem5"><img src="res/images/content/tv6.png"></div>
            </div>

            <h1>Web Videos</h1>
            <div id="contentCol3">
                <div id="contentItem1"><img src="res/images/content/web1.png"></div>
                <div id="contentItem2"><img src="res/images/content/web2.png"></div>
                <div id="contentItem3"><img src="res/images/content/web3.png"></div>
                <div id="contentItem4"><img src="res/images/content/web4.png"></div>
                <div id="contentItem5"><img src="res/images/content/web5.png"></div>
            </div>

            <h1>DVR</h1>
            <div id="contentCol4">
                <div id="contentItem1"><img src="res/images/content/dvr1.png"></div>
                <div id="contentItem2"><img src="res/images/content/dvr2.png"></div>
                <div id="contentItem3"><img src="res/images/content/dvr3.png"></div>
                <div id="contentItem4"><img src="res/images/content/dvr4.png"></div>
            </div>


        </div>
    </div>' );
       } 

       if (routeId == 2){
         viewport.render('<div id="searchContent">Search</div>');
       } 

       if (routeId == 3){
         viewport.render('<div id="dashboardContent">Dashboard</div>');
       } 

       if (routeId == 4){
         viewport.render('<div id="dashboardContent">Recordings</div>');
       } 

       if (routeId == 5){
         viewport.render('<div id="listingsGrid"><img src="res/images/listings.png"></div>  ');
       } 

       if (routeId == 6){
         viewport.render('<div id="dashboardContent">Settings</div>');
       } 

        //viewport.render( 'You clicked route "' + routeId + '"' );
    }


    
});


// Run example's components.
var viewport = new Viewport();
var menu = new Menu();
var router = new Router();
Backbone.history.start();




/**
 * BackboneBoilerplate jsFiddle - please don't remove this comment!
 * http://movableapp.com/2012/06/backbone-boilerplate-jsfiddle/
 */
