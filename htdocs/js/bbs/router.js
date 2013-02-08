if (! window.bbs) bbs = {};

(function($, __global__) {

    // ======= Router settings
    var Router = function() {
        Kazitori.apply(this, arguments);
    };
    Router.prototype = $.extend(true, {}, Kazitori.prototype, {
        routes: {
            '':                                                              'index',
            '/':                                                             'index',
            '/category':                                                     'category',
            '/category/':                                                    'category',
            '/category/<int:category_id>/thread':                            'thread',
            '/category/<int:category_id>/thread/':                           'thread',
            '/category/<int:category_id>/thread/add':                        'addThread',
            '/category/<int:category_id>/thread/add/':                       'addThread',
            '/category/<int:category_id>/thread/<int:thread_id>/post':       'post',
            '/category/<int:category_id>/thread/<int:thread_id>/post/':      'post',
            '/category/<int:category_id>/thread/<int:thread_id>/post/add':   'addPost',
            '/category/<int:category_id>/thread/<int:thread_id>/post/add/':  'addPost',
        },
        index: function() {
            this.change('/category/');
        },
        category: function() {
            bbs.controller.category.index();
        },
        post: function(category_id, thread_id) {
            bbs.controller.post.index(category_id, thread_id);
        },
        thread: function(category_id) {
            bbs.controller.thread.index(category_id);
        },
        addThread: function(category_id) {
            bbs.controller.thread.add(category_id);
        },
        addPost: function(category_id, thread_id) {
            bbs.controller.post.add(category_id, thread_id);
        }
    });

    bbs.router = new Router({root: '/'});

})(this.jQuery, this);
