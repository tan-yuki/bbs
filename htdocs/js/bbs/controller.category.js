if (! window.bbs) bbs = {};
if (! bbs.controller) bbs.controller = {};

(function($, __global__) {


    /**
     * Category controller
     *
     * @require bbs.model.category
     * @require bbs.view.category
     */
    var CategoryController = function() {};

    CategoryController.prototype = {
        url: {
            get: '/api/bbs/category/'
        },

        /**
         * Index action
         */
        index: function() {
            var that = this;

            // fetch category data from API
            bbs.apiclient.requestGet(this.url.get, {}, function(data) {
                var categoryModel = bbs.model.category;
                categoryModel.populate(data);

                // Pass to view
                bbs.view.category.refreshView(categoryModel.toArray());

                that.bindEvents();
            });
        },

        bindEvents: function() {
            var $root = $('#bbs-contents');

            // click category link
            $root.find('li.category').find('a').click(function() {
                var $this = $(this);
                var category_id = $this.parents('li.category').find('input.id').val();
                bbs.router.change('/thread/' + category_id);
            });
        }
    };

    bbs.controller.category = new CategoryController();

})(this.jQuery, this);
