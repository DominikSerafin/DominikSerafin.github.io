
var $body = $('html, body');

/*
var smoothState = $('#smooth-state').smoothState({

    prefetch: true,



    // Runs when a link has been activated
    onStart: {

        duration: 500, // Duration of our animation

        render: function ($container) {
            // toggleAnimationClass() is a public method
            // for restarting css animations with a class
            $container.addClass('is-exiting');
            // Scroll user to the top

            smoothState.restartCSSAnimations();

        }


    },



    // Runs when a link has been activated
    onReady: {

        duration: 0,

        render: function ($container, $newContent) {
            // toggleAnimationClass() is a public method
            // for restarting css animations with a class
            $container.removeClass('is-exiting');
            // Scroll user to the top

            $container.html($newContent);

            writemail();
        }


    },





}).data('smoothState');
//.data('smoothState') makes public methods available
*/





var writemail = function(){
    $('.js-email').html( unescape("%3c%61%20%68%72%65%66%3d%22%6d%61%69%6c%74%6f%3a%64%6f%6d%69%6e%69%6b%64%73%67%6e%72%40%67%6d%61%69%6c%2e%63%6f%6d%22%3e%64%6f%6d%69%6e%69%6b%64%73%67%6e%72%40%67%6d%61%69%6c%2e%63%6f%6d%3c%2f%61%3e"));
};

writemail();



$(document).on('click', 'a', function(event) {

   var a = new RegExp('/' + window.location.host + '/');

   if(!a.test(this.href)) {
       event.preventDefault();
       event.stopPropagation();
       window.open(this.href, '_blank');
   }

});

