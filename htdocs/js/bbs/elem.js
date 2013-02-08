if (! window.bbs) bbs = {};

(function($, __global__) {

    bbs.elem = function(selectors) {
        for (var name in selectors) {
            var selector = selectors[name];
            this[name] = $(selector);
        }
    };

    $(function() {});

})(this.jQuery, this);
