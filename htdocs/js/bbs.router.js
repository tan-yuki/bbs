if (! window.bbs) bbs = {};

(function($, __global__) {

    // ======= Router settings
    var Router = function() {
        Kazitori.apply(this, arguments);
    };
    Router.prototype = $.extend(true, {}, Kazitori.prototype, {
        routes: {
            '':                           'index',
            '/':                          'index',
            '/category':                  'category',
            '/category/':                 'category',
            '/thread/<int:category_id>':  'thread',
            '/thread/<int:category_id>/': 'thread',
            '/post/<int:thread_id>':      'post',
            '/post/<int:thread_id>/':     'post'
        },
        index: function() {
            this.change('/category/');
        },
        category: function() {
            bbs.controller.category.index();
        },
        post: function(thread_id) {
            bbs.controller.post.index(thread_id);
        },
        thread: function(category_id) {
            bbs.controller.thread.index(category_id);
        }
    });

    bbs.router = new Router({root: '/'});

})(this.jQuery, this);
