(function( $ ){
  $.fn.fitText = function( kompressor, options ) {
    let compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){
      let $this = $(this);
      let resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };
      resizer();
      $(window).on('resize.fittext orientationchange.fittext', resizer);
    });
  };
})( jQuery );