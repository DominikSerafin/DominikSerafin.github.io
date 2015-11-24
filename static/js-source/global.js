/*------------------------------------*\
    throttle
\*------------------------------------*/
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


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


/*------------------------------------*\
    Progress Indicator
\*------------------------------------*/
(function(){

    var height = document.body.clientHeight;
    var percent;

    $(window).on('resize', throttle(function(){
        height = document.body.clientHeight;
    }, 50));

    $(window).on('scroll', throttle(function(){
        percent = (window.scrollY + window.outerHeight) / height * 100;
        $('.js-pbar-fill').width(percent+"%");
    }, 10));



})();
