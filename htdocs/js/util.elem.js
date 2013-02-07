if (! window.todo) todo = {};
if (! todo.util) todo.util = {};

(function($, __global__) {
    todo.util.elem = function(selectors) {

        var returnObj = {
            init: function() {
                var elem = {};
                for(var name in selectors) {
                    this[name] = $(selectors[name]);
                }
            }
        };

        returnObj.init();
        return returnObj;
    };

}) (jQuery, window);
