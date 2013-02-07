if (! window.bbs) bbs = {};
if (! bbs.view) bbs.view = {};

(function($, __global__) {

    var PostView = function() {};

    PostView.prototype = {
        refreshView: function(data) {
            var html = $('#post-tmpl').tmpl({posts: data});
            $('#bbs-contents').html(html);
        }
    };

    bbs.view.post = new PostView();

})(this.jQuery, this);
