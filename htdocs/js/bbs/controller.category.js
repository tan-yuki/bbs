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
            bbs.model.category.refresh({}, function(data) {
                // Pass to view
                bbs.view.category.refreshView({
                    categories: bbs.model.category.toArray()
                });

                that.bindEvents();

            });
        },

         bindEvents: function() {
             var $root = $('#bbs-contents');
             $root.find('li.category').find('a').click(function() {
                 var $this = $(this);
                 var categoryId = $this.parents('li.category').find('input.id').val();
                 bbs.router.change('/category/' + categoryId + '/thread/');
             });
         }

    };

    bbs.controller.category = new CategoryController();

})(this.jQuery, this);
