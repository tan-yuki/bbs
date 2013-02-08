if (! window.bbs) bbs = {};
if (! bbs.view) bbs.view = {};

(function($, __global__) {

    var ThreadView = function() {};

    ThreadView.prototype = {
        refreshView: function(data) {
            var html = $('#thread-tmpl').tmpl({threads: data});
            $('#bbs-contents').html(html);
        }
    };

    bbs.view.thread = new ThreadView();

})(this.jQuery, this);
