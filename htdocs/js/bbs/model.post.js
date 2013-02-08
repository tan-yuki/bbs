if (! window.bbs) bbs = {};
if (! bbs.model) bbs.model = {};

(function($, __global__) {

    var PostModel = Model.create();
    PostModel.attributes = [
        'id',
        'title',
        'user_id',
        'thread_id',
        'contents',
        'update_date',
        'create_date',
        'user_name',
        'user_thumbnail'
    ];

    PostModel.extend({
        refresh: function(param, callback) {
            var url = bbs.controller.post.url;
            bbs.apiclient.requestGet(url.get, param, function(data) {
                PostModel.populate(data);
                callback(data)
            });
        }
    });

    bbs.model.post = PostModel;
})(this.jQuery, this);
