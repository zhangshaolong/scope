var Scope = function () {
    var slice = Array.prototype.slice;
    var Scope = function (options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.events = {};
    };
    Scope.new = function (options) {
        return new Scope(options);
    };
    Scope.prototype.on = function (name, callback, context) {
        if (!name || !callback) return false;
        this.events || (this.events = {});
        var evts = this.events[name] || (this.events[name] = []);
        var details = {callback: callback, context: context || this};
        evts.unshift(details);
        return details;
    };
    Scope.prototype.un = function (name, callback) {
        var type = typeof name;
        if(type === 'string'){
            var evts = this.events[name],
                len = evts.length;
            var callType = typeof callback;
            if ('undefined' === callType) {
                this.events[name] = [];
            } else if ('function' === callType) {
                while(len--){
                    if(callback === evts[len].callback){
                        evts.splice(len, 1);
                    }
                }
            } else {
                while (len--) {
                    if (callback === evts[len]) {
                        evts.splice(len, 1);
                    }
                }
            }
        }
        if (type === 'undefined') {
            this.events = {};
        }
    };
    Scope.prototype.fire = function (name) {
        var evts = this.events[name],
            len = evts.length;
        var args = slice.call(arguments, 1);
        while (len--) {
            var evt = evts[len];
            evt.callback.apply(evt.context, args);
        }
    };
    Scope.prototype.subScope = function (options) {
        var SubScope = function (options) {
            for (var key in options) {
                this[key] = options[key];
            }
        };
        SubScope.prototype = this;
        return new SubScope(options);
    };
    return Scope;
}();