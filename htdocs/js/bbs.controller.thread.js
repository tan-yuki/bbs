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
            get: '/api/bbs/thread/'
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

            // fetch thread data from API
            bbs.apiclient.requestGet(this.url.get, params, function(data) {
                var threadModel = bbs.model.thread;
                threadModel.populate(data);

                // Pass to view
                bbs.view.thread.refreshView(threadModel.toArray());

                that.bindEvents();
            });
        },

        bindEvents: function() {
            var $root = $('#bbs-contents');

            // click category link
            $root.find('li.thread').find('a').click(function() {
                var $this = $(this);
                var thread_id = $this.parents('li.thread').find('input.id').val();
                bbs.router.change('/post/' + thread_id);
            });
        }
    };

    bbs.controller.thread = new ThreadController();

})(this.jQuery, this);
