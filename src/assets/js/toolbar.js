/*(function($, window, document){
  'use-strict';

  $('html').toggleClass('seopro-bar-active');

  var elementsToFix = [];

  $('*').filter(function(i, o){
    if($(o).css('position') === 'fixed'){
      elementsToFix.push({
        element: $(o),
        style: isDefined($(o).attr('style'))
      });
    }
  });

  $.each(elementsToFix, function(i, o){
    var ele = o.element, style = o.style, marginTop = (parseInt(isDefined(ele.css('margin-top'), 0))+42);

    if($('html').hasClass('seopro-bar-active')){
      ele.attr('style', style+' margin-top:'+marginTop+'px !important'.replace(/undefined/i, ''));
    } else {
      ele.attr('style', style);
    }
  });

  if($('html').hasClass('seopro-bar-active')){
    $(window).trigger('seoproBarDidToggle', true);
  }else{
    $(window).trigger('seoproBarDidToggle', false);
  }
})(window.jQuery, window, document, undefined); */

window.seoPro = {
  isDefined: function (variable, message) {
    if(typeof message === undefined){message = ""}

    return (!typeof variable === undefined) ? variable : message;
  }
};

window.seoPro.initBar = (function($, window, document) {
  'use-strict';

  var barActiveClass = 'seopro-bar-active',
      barToggle = $('html').toggleClass(barActiveClass),
      barIsActive = $('html').hasClass(barActiveClass);

  if($('html').hasClass(barActiveClass)) {
    $('body').trigger('seoProbarDidToggle', true);
  } else {
    $('body').trigger('seoProbarDidToggle', false);
  }
})(window.jQuery, window, document, undefined);
