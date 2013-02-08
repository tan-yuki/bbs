if (! window.bbs) bbs = {};
if (! bbs.model) bbs.model = {};

(function($, __global__) {

    var ThreadModel = Model.create();
    ThreadModel.attributes = ['id', 'name', 'user_id', 'category_id'];

    ThreadModel.extend({
        refresh: function(param, callback) {
            var url = bbs.controller.thread.url;
            bbs.apiclient.requestGet(url.get, param, function(data) {
                ThreadModel.populate(data);
                callback(data)
            });
        }
    });

    bbs.model.thread = ThreadModel;

})(this.jQuery, this);
