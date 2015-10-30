/*------------------------------------*\
    Open external links in new window
\*------------------------------------*/
$(document).on('click', 'a', function(event) {

   var a = new RegExp('/' + window.location.host + '/');

   if(!a.test(this.href)) {
       event.preventDefault();
       event.stopPropagation();
       window.open(this.href, '_blank');
   }

});




//$('.js-landing-packery-wrapper').packery({
//    itemSelector: '.js-landing-packery-item',
//    gutter: 10
//});