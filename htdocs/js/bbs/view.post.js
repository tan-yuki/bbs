if (! window.bbs) bbs = {};
if (! bbs.view) bbs.view = {};

(function($, __global__) {

    var PostView = function() {};

    PostView.prototype = {
        refreshView: function(data) {

            // cache img
            var html = $('#post-tmpl').tmpl(data);
            $('#bbs-contents').html(html);
        },

        add: function(category_id) {
            var html = $('#post-modal-add-tmpl').tmpl();
            var $root = $('#modal-root');
            $root.html(html).modal();
        },

        notfound: function(data) {
            var html = $('#thread-notfound-tmpl').tmpl(data);
            $('#bbs-contents').html(html);
        }
    };

    bbs.view.post = new PostView();

})(this.jQuery, this);
