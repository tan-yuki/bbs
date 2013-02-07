if (! window.bbs) bbs = {};
if (! bbs.controller) bbs.controller = {};

(function($, __global__) {


    /**
     * Post controller
     *
     * @require bbs.model.post
     * @require bbs.view.post
     */
    var PostController = function() {};

    PostController.prototype = {
        url: {
            get: '/api/bbs/post/'
        },

        /**
         * Index action
         *
         * @param {Integer}   Thread id
         */
        index: function(thread_id) {
            var that = this,
                params = {
                    thread_id: thread_id
                };

            // fetch post data from API
            bbs.apiclient.requestGet(this.url.get, params, function(data) {
                var postModel = bbs.model.post;
                postModel.populate(data);

                // Pass to view
                bbs.view.post.refreshView(postModel.toArray());

                that.bindEvents();
            });
        },

        bindEvents: function() {
            var $root = $('#bbs-contents');
        }
    };

    bbs.controller.post = new PostController();

})(this.jQuery, this);
