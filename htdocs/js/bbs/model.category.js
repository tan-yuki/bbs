if (! window.bbs) bbs = {};
if (! bbs.model) bbs.model = {};

(function($, __global__) {

    var CategoryModel= Model.create();
    CategoryModel.attributes = ['id', 'name'];

    CategoryModel.extend({
        refresh: function(param, callback) {
            var url = bbs.controller.category.url;
            bbs.apiclient.requestGet(url.get, {}, function(data) {
                CategoryModel.populate(data);
                callback()
            });
        }
    });

    bbs.model.category = CategoryModel;

})(this.jQuery, this);
