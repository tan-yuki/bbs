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
            get:  '/api/bbs/post/',
            save: '/api/bbs/post/save'
        },

        /**
         * Index action
         *
         * @param {Integer}   Category id
         * @param {Integer}   Thread id
         */
        index: function(category_id, thread_id) {
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
                        userId = record.user_id,
                        thumbUrl = record.user_thumbnail;

                    if (! thumbnailCache[userId]) {
                        var img = new Image();
                        img.src = thumbUrl;
                        thumbnailCache[userId] = img;
                    }
                }


                // Pass to view
                var params = {
                    category_id: category_id,
                    thread_id:   thread_id,
                    posts:       postModel.toArray()
                };
                bbs.view.post.refreshView(params);
                that.bindEvents(category_id, thread_id);

                // set user thumbnail
                var $root = $('#bbs-contents');
                for (var userId in thumbnailCache) {
                    var img = thumbnailCache[userId];
                    var $userThumnbs = $root.find('img.user-img-' + userId);
                    if ($userThumnbs.length) {
                        $userThumnbs.attr('src', img.src);
                    }
                }
            });
        },

        bindEvents: function(category_id, thread_id) {
            var $root = $('#bbs-contents');

            // post button
            $('#add-new-post-link-container').click(function(e) {
                bbs.router.change('/category/' + category_id + '/thread/' + thread_id + '/post/add/');
            });

            // go back to thread list link
            $root.find('a.back').click(function() {
                bbs.router.change('/category/' + category_id + '/thread/');
            });

            var userId = $('#user_id').val();
            var $postList = $root.find('li.post');
            $postList.mouseenter(function() {
                var $this = $(this);
                var postUserId = $this.data('userid');

                if (userId == postUserId) {
                    $this.find('.post-body').addClass('active');
                }
            });
            $postList.mouseleave(function() {
                $postList.find('.post-body').removeClass('active');
            });
        },

        add: function(category_id, thread_id) {
            bbs.view.post.add();
            this.bindAddModelEvents(category_id, thread_id);
        },

        bindAddModelEvents: function(category_id, thread_id) {
            var that = this;
            var $modal = $('#modal-root');
            var $input = $('#new-thread-name');


            // submit saving thread
            $modal.find('#post-add-btn').click(function() {
                var params = {
                    user_id:     $('#user_id').val(),
                    thread_id:   thread_id,
                };

                $modal.find('.post-data').each(function() {
                    var $this = $(this);
                    params[$this.attr('name')] = $this.val();
                });

                bbs.apiclient.requestPost(that.url.save, params, function() {
                    $modal.modal('hide');
                });
            });
            // when close modal
            $modal.on('hidden', function() {
                bbs.router.change('/category/' + category_id + '/thread/' + thread_id + '/post/');
            });
        }

    };

    bbs.controller.post = new PostController();

})(this.jQuery, this);
