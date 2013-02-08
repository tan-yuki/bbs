if (! window.bbs) bbs = {};
if (! bbs.controller) bbs.controller = {};

(function($, __global__) {


    /**
     * Thread controller
     *
     * @require bbs.model.thread
     * @require bbs.view.thread
     */
    var ThreadController = function() {};
    ThreadController.prototype = {

        url: {
            get:  '/api/bbs/thread/',
            save: '/api/bbs/thread/save'
        },

        /**
         * Index action
         *
         * @param {Integer}   Thread id
         */
        index: function(category_id) {

            var that = this,
                params = {
                    category_id: category_id
                };

            // fetch thread data from API
            bbs.model.thread.refresh(params, function(threadsData) {

                var refresh = function() {
                    var category = bbs.model.category.findBy('id', category_id)[0];

                    if (threadsData.length) {
                        // Pass to view
                        bbs.view.thread.refreshView({
                            category: category.attributes(),
                            threads: bbs.model.thread.toArray()
                        });
                    } else {
                        // Not found threads
                        bbs.view.thread.notfound({
                            category: category.attributes()
                        });
                    }

                    that.bindEvents();
                };

                if (bbs.model.category.empty()) {
                    // not loaded categories
                    bbs.model.category.refresh({}, function() {
                        refresh();
                    });
                    return;
                }

                refresh();
            });
        },

        bindEvents: function() {
            var $root = $('#bbs-contents');
            var categoryId = $root.find('#category_id').val();

            // link to posts page
            $root.find('li.thread').find('a').click(function() {
                var $this = $(this);
                var threadId   = $this.parents('li.thread').find('input.id').val();
                bbs.router.change('/category/' + categoryId + '/thread/' + threadId + '/post/');
            });

            // add thread link
            $root.find('#new-thread-link').click(function() {
                bbs.router.change('/category/' + categoryId + '/thread/add');
            });

            // back to category list link
            $root.find('p.back').click(function() {
                bbs.router.change('/category/');
            });
        },

        /**
         * Add thread action
         *
         * @param {Integer}   Thread id
         */
        add: function(category_id) {
            bbs.view.thread.add(category_id);
            this.bindAddModelEvents(category_id);
        },

        bindAddModelEvents: function(category_id) {
            var that = this;
            var $modal = $('#modal-root');
            var $input = $('#new-thread-name');


            // submit saving thread
            $modal.find('#thread-add-btn').click(function() {
                if (! $input.val()) {
                    return false;
                }

                var params = {
                    user_id:     $('#user_id').val(),
                    category_id: category_id,
                    name:        $input.val()
                }

                bbs.apiclient.requestPost(that.url.save, params, function() {
                    $modal.modal('hide');
                });
            });
            // when close modal
            $modal.on('hidden', function() {
                bbs.router.change('/category/' + category_id + '/thread/');
            });
        }
    };

    bbs.controller.thread = new ThreadController();

})(this.jQuery, this);
