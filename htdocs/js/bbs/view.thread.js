if (! window.bbs) bbs = {};
if (! bbs.view) bbs.view = {};

(function($, __global__) {

    var ThreadView = function() {};

    ThreadView.prototype = {
        refreshView: function(data) {
            var html = $('#thread-tmpl').tmpl(data);
            $('#bbs-contents').html(html);
        },

        add: function(category_id) {
            var html = $('#thread-modal-add-tmpl').tmpl();
            var $root = $('#modal-root');
            $root.html(html).modal();
        },

        notfound: function(data) {
            var html = $('#thread-notfound-tmpl').tmpl(data);
            $('#bbs-contents').html(html);
        }
    };

    bbs.view.thread = new ThreadView();

})(this.jQuery, this);
