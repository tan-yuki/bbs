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
         * @param {Integer}   Category id
         */
        index: function(category_id) {

            var params = {
                category_id: category_id
            };
            // fetch thread data from API
            bbs.apiclient.requestGet(this.url.get, params, function(data) {
                var threadModel = bbs.model.thread;
                threadModel.populate(data);

                // Pass to view
                bbs.view.thread.refreshView(threadModel.toArray());
            });
        }
    };

    bbs.controller.thread = new ThreadController();

})(this.jQuery, this);
