if (! window.bbs) bbs = {};
if (! bbs.view) bbs.view = {};

(function($, __global__) {

    var CategoryView = function() {
        this.init.apply(this, arguments);
    };

    CategoryView.prototype = {
        init: function() {
        },

        refreshView: function(data) {
            var html = $('#category-tmpl').tmpl({categories: data});
            $('#bbs-contents').html(html);
        }
    };

    bbs.view.category = new CategoryView();

})(this.jQuery, this);
