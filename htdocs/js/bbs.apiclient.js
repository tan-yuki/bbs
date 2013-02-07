if (! window.bbs) bbs = {};

(function($, __global__) {
    var ApiClient = function() {};

    var STATUS_SUCCESS = 'ok';
    var STATUS_NG      = 'ng';

    ApiClient.prototype = {
        request: function(url, params, method, callback) {
            $.ajax({
                url: url,
                type: method || 'GET',
                dataType: 'json',
                data: params || {},
                success: function(data) {
                    if (data.header && data.header.status === STATUS_SUCCESS) {
                        callback(data.body);
                        return;
                    }
                    // TODO: some error handling
                },
                error: function() {
                    // TODO: some error handling
               }
            });
        },

        requestGet: function(url, params, callback) {
            this.request(url, params, 'GET', callback);
        },
        requestPost: function(url, params, callback) {
            this.request(url, params, 'POST', callback);
        },
        requestPut: function(url, params, callback) {
            this.request(url, params, 'PUT', callback);
        }
    };

    bbs.apiclient = new ApiClient();
})(this.jQuery, this);
