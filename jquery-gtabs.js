/*!
 * jQuery General Tab
 * http://blog.istvan-antal.ro/
 *
 * Copyright 2010, Antal István Miklós
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.istvan-antal.ro/license
 *
 */

(function($,window,document,undefined) {
    //Extend jQuery method space
    $.fn.extend({
        gtabs:function(opts,param1) {
            if (!opts) {
                opts = {};
            }
            opts.tabClass = opts.tabClass || 'tab';
            var ret = this;
            $(this).each(function() {
                var that = this,
                    data;
                switch (opts) {
                    case 'getTabs':
                        var tabs = [];
                        
                        data = $(this).data('gtab-options');
                        $(this).find('.' +  data.tabClass + '[id]').each(function() {
                            tabs.push($(this).attr('id'));
                        });
                        ret = tabs;
                        return false;
                        break;
                    case 'activate':
                        if (!param1) {
                            throw 'Param is falsey';
                        }
                        var pane = $(this).find("#"+param1);
                        data = $(this).data('gtab-options');
                        
                        if (pane.size()) {
                            $(this).find('.' + data.tabClass).hide();
                            pane.show();
                            
                            if (data.select) {
                                data.select.call(this, param1);
                            }
                        }
                        break;
                    default:
                        //$(this).addClass('.gtab');
                        $(this).data('gtab-options', opts);
                        $(this).delegate("a[href^='#']",'click', function(e) {
                            var id = $(this).attr('href').split('#')[1];
                            if (id) {
                                var tab = $(that).find('#'+id);
                                if (tab.size()) {
                                    $(that).find('.' + opts.tabClass).hide();
                                    tab.show();
                                    if (opts.select) {
                                        opts.select.call(that, id);
                                    }
                                    e.preventDefault();
                                }
                            }
                        });
                        $(this).gtabs('activate',$(this).gtabs('getTabs')[0]);
                }
            });

            return ret;
        }
    });
}(jQuery,window,document));