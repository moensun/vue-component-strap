
var Module = require('module').Module,
    _load = Module._load,
    expose = require('./lib/expose.js');

function wrap(caller) {
    return expose(caller);
};

/*!
 * Hack to wrap the calling modules path
 * in a closure... Not crazy about this but..
 */
// TODO: find a better way to determine calling module
Module._load = function(request, parent, isMain) {
    var mod = _load.apply(this, arguments),
        filename = Module._resolveFilename(request, parent);

    // requiring this module, wrap it
    if (filename == __filename && mod) {
        return wrap(parent.id);
    }
    return mod;
};

// 1st time we've been required, wrap the parent id
module.exports = wrap(module.parent.id);

