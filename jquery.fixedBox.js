/* fixedBox : fixed box jQuery plugin
 * Copyright (C) 2007 Jean-Francois Hovinne - http://www.hovinne.com/
 * Dual licensed under the MIT and GPL licenses.
 */

jQuery.fn.fixedBox = function(options) {

    options = jQuery.extend({
    
        x: false,
        y: false
    
    }, options);    
    
    return(this.each(function() {
    
        var x = y = 0;
    
        if(!options.x || !options.y) {
        
            //compute top and left positions
            
            var ww = document.documentElement.clientWidth
                     || document.body.clientWidth;
            var hh = document.documentElement.clientHeight
                     || document.body.clientHeight;
                     
            //Opera
            if(jQuery.browser.opera) hh = document.body.clientHeight;
    
            var w = jQuery(this).width();
            var h = jQuery(this).height();
            
            var padx = jQuery(this).css('padding-left');
            padx = parseInt(padx.substring(0, padx.length - 2));
            var pady = jQuery(this).css('padding-top');
            pady = parseInt(pady.substring(0, pady.length - 2));
            
            var borx = jQuery(this).css('border-left-width');
            borx = parseInt(borx.substring(0, borx.length - 2));
            if(!borx) borx = 0;
            var bory = jQuery(this).css('border-top-width');
            bory = parseInt(bory.substring(0, bory.length - 2));
            if(!bory) bory = 0;
            
            x = Math.round((ww - w - 2*padx - 2*borx)/2);
            y = Math.round((hh - h - 2*pady - 2*bory)/2);
        }
        
        if(options.x) x = parseInt(options.x);
        if(options.y) y = parseInt(options.y);

        //handle MSIE 6.0
        if(jQuery.browser.msie && jQuery.browser.version == '6.0') {
        
            //see http://www.howtocreate.co.uk/fixedPosition.html
            var expression = "( " + y + " + ( ignoreMe = "
                           + "document.documentElement.scrollTop ? "
                           + "document.documentElement.scrollTop : "
                           + "document.body.scrollTop ) ) + 'px'";
                         
            jQuery(this).get(0).style.setExpression("top", expression);
        
            jQuery(this).css({
                position: 'absolute',
                zIndex: '1000',
                left: x + 'px'            
            });
        
        } else
    
            jQuery(this).css({
            
                position: 'fixed',
                zIndex: '1000',
                top: y + 'px',
                left: x + 'px'            
            });
    }));
};
