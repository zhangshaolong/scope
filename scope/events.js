var Events = (function () {
    var slice = Array.prototype.slice;
    var Events = {
        on: function (name, callback, context) {
            if (!name || !callback) return false;
            this.events || (this.events = {});
            var evts = this.events[name] || (this.events[name] = []);
            var details = {callback: callback, context: context || this};
            evts.unshift(details);
            return details;
        },
        un: function (name, callback) {
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
        },
        fire: function (name) {
            var evts = this.events[name],
                len = evts.length;
            var args = slice.call(arguments, 1);
            while (len--) {
                var evt = evts[len];
                evt.callback.apply(evt.context, args);
            }
        }
    };
    return Events;
})();