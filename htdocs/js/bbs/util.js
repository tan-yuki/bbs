if (! window.bbs) bbs = {};

(function($, __global__) {
    bbs.util = {
        objlen: function(obj) {
            var len = 0;
            for (var key in obj) {
                len++;
            }

            return len;
        }
    }

})(this.jQuery, this);
