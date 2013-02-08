if (! window.bbs) bbs = {};
if (! bbs.controller) bbs.controller = {};

(function($, __global__) {

    /**
     * (key, value) = ([user id]: [thumnail image object])
     */
    var thumbnailCache = {};


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

                // cache user thumbnail
                for (var i = 0, len = data.length; i < len; i++) {
                    var record = data[i],
                        userId = record.user.id,
                        thumbUrl = record.user.thumbnail;

                    if (! thumbnailCache[userId]) {
                        var img = new Image();
                        img.src = thumbUrl;
                        thumbnailCache[userId] = img;
                    }
                }


                // Pass to view
                bbs.view.post.refreshView(postModel.toArray());

                // set user thumbnail
                var $root = $('#bbs-contents');
                for (var userId in thumbnailCache) {
                    var img = thumbnailCache[userId];
                    var $userThumnbs = $root.find('img.user-img-' + userId);
                    if ($userThumnbs.length) {
                        $userThumnbs.attr('src', img.src).show();

                        img.onload = function() {
                            $userThumnbs.parents('li.poster-thumbnail').prev().hide();
                        };
                    }
                }

                that.bindEvents();
            });
        },

        bindEvents: function() {
            var $root = $('#bbs-contents');
        }
    };

    bbs.controller.post = new PostController();

})(this.jQuery, this);
