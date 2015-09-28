module.exports = function(){


    $('.readmore__btn').on('click', function(event) {
        event.preventDefault();

        var $this = $(this);
        var $btn = $(this);
        var $container = $this.closest('.readmore');
        var $content   = $container.find('.readmore__content');

        var origHeight = $content.prop('scrollHeight');

        if($container.hasClass('is-open')) {

            $container.removeClass('is-open');
            $content.height(0);
            $btn.text($this.attr('data-more-text'));


        }

        else {

            $container.addClass('is-open');
            $content.height(origHeight);
            $btn.text($this.attr('data-less-text'));

        }


    });

};
