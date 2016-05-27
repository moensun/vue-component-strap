
/*!
 * Module dependencies.
 */

var fs = require('fs'),
    path = require('path'),
    env = process.env.NODE_ENV || 'development';

/*!
 * Node 0.6 does not define path.sep so define it
 * based on platform.
 */

// TODO: common module
var sep = path.sep ? path.sep
        : process.platform === 'win32' ? '\\' : '/';

/**
 * Print a debug statement to `console.log` if
 * `process.env.NODE_ENV` is set to `debug` or
 * `trace`.
 *
 *  You can set the NODE_ENV in your calling code
 *  before `require`ing expose, or you can set it
 *  as an env variable prior to invoking `node`.
 *
 *  Examples:
 *
 *  process.env.NODE_ENV = 'debug';
 *  var expose = require('./lib/expose.js').expose;
 *  expose({...});
 *  // => debug messages
 *
 * @api private
 */

function debug() {
    if (env == 'debug' || env == 'trace') {
        console.log.apply(this, arguments);
    }
};

/**
 * Perform a top level mixing between and source
 * and destination object optionally skipping
 * undefined/null properties.
 *
 * Examples:
 *
 *  mixin({a: 'A'}, {b: 'B});
 *  // => {a: 'A', b: 'B'}
 *
 *  mixin({'a': null}, {b: 'B}, true);
 *  // => {b: 'B'}
 *
 * @param {Object} src
 * @param {Object} dest
 * @param {Boolean} skipEmpty
 * @returns {Object}
 * @api private
 */

function mixin(src, dest, skipEmpty) {
    // TODO: refactor into common module
    var dest = dest || {}, src = src || {},
        keys = Object.keys(src), len = keys.length, key;

    for (var i = 0; i < len; i++) {
        key = keys[i];
        if (!exists(dest[key]) && (skipEmpty && exists(src[key]))) {
            dest[key] = src[key];
        }
    }
    return dest;
};

/**
 * Determines if a value is non null
 * and defined.
 *
 * @param o
 * @returns {Boolean}
 * @api private
 */

function exists(o) {
    // TODO: common module
    return o !== null && o !== undefined;
};

/**
 * Returns its argument as an array.
 *
 * @param o
 * @returns {Array}
 * @api private
 */

function asArray(o) {
    // TODO: common module
    return Array.isArray(o)
            ? o
            : exists(o) ? [o] : [];
};

/**
 * Resolve and return an absolute path.
 *
 * @param {String} dir The directory
 * @param {String} file The file in the directory
 * @returns {String} The resolved absolute path.
 * @api private
 */

function toPath(dir, file) {
    // TODO: move into common module
    return path.resolve(dir) + sep + file;
};

/**
 * Given a target string, test the string against
 * an array of `RegExp` objects representing patterns
 * to include and an array of `RegExp` objects
 * representing patterns to exclude. Only return
 * `true` when one of the inclusive patterns test
 * and when none of the exlude patterns test.
 *
 * @param {String} target The string to test.
 * @param {Array} grep An array of RegExp objects indicating inclusion.
 * @param {Array} ungrep An array of RegExp objects indicating exclusion.
 * @returns {Boolean} Returns true if 1 include pattern matches and 0 exclusions match.
 * @api private
 */

function test(target, grep, ungrep) {
    function testRegexes(regexes) {
        return regexes.some(function(regex) {
            return regex.test(target);
        });
    }
    return testRegexes(grep) && !testRegexes(ungrep);
};

/**
 * Import a module into the given scope there by
 * `require`ing the module and copying its exports
 * into the given scope object.
 *
 * @param {String} module The path to the module to require.
 * @param {Object} scope The namespace to import the modules exports into.
 * @param {Function} fn The optional callback function to invoke for each imported property.
 * @api private
 */

function importModule(module, scope, fn) {
    debug("Importing module: " + module);

    var imports = require(module),
        name = path.basename(module, path.extname(module));

    if (isPlainObject(imports)) {
        var keys = Object.keys(imports), key, len = keys.length;
        for (var i = 0; i < len; i++) {
            key = keys[i];
            if (imports.hasOwnProperty(key)) {
                scope[key] = imports[key];
                if (fn) {
                    fn(name, key, imports[key]);
                }
            }
        }
    } else {
        scope[name] = imports;
        if (fn) {
            fn(name, null, imports);
        }
    }
};

/**
 * Determine if the given object is a plain object.
 *
 * @param obj {Mixed}
 * @returns {Boolean}
 * @api private
 */
function isPlainObject(obj) {
    return typeof obj == 'object' && obj.constructor == Object;
};

/**
 * Perform importing on the given target based on the
 * given options. The target can be a directory to
 * walk or it can be a file.
 *
 * The `opts` passed in should be the same format
 * as those built with `defaultOpts`.
 *
 * @param {String} target The file or dir to target.
 * @param {Object} opts The options to use for importing.
 * @api private
 */

function load(target, opts) {
    target = path.resolve(target);

    debug("Load enter: " + target);

    if (fs.statSync(target).isDirectory()) {
        var files = fs.readdirSync(target), len = files.length, file;
        for (var i = 0; i < len; i++) {
            file = files[i];
            var fullPath = target + sep + file;

            if (fs.statSync(fullPath).isDirectory() && opts.recurse) {
                load(fullPath, opts);
            } else if (test(fullPath, opts.grep, opts.ungrep)) {
                importModule(fullPath, opts.scope, opts.fn);
            }
        }
    } else if (test(target, opts.grep, opts.ungrep)) {
        importModule(target, opts.scope, opts.fn);
    }
};

/**
 * Returns the grandparent module directory which
 * is assumed to be the requiring module.
 *
 * @returns {String} The grandparent module directory.
 * @api private
 */

function grandparentDir() {
    return path.dirname(module.parent.parent.filename);
};

/**
 * Build and return the default target directory to expose
 * by determining the first directory that exists in the
 * following order:
 * `dirname(parentId) + /lib`
 * `dirname(parentId) + /src`
 * `dirname(grandparentDir())/lib`
 * `dirname(grandparentDir())/src`
 * `process.cwd()`
 *
 * @param {String} parentId The path of the requiring module.
 * @returns {String} The default target dir to expose.
 * @api private
 */

function defaultTarget(parentId) {
    var paths = [], targetDir = process.cwd(), len, target;

    function pushTargets(p) {
        if (p) {
            paths.push(toPath(path.dirname(p), 'lib'));
            paths.push(toPath(path.dirname(p), 'src'));
        }
    }

    pushTargets(parentId);
    pushTargets(grandparentDir());

    len = paths.length;
    for (var i = 0; i < len; i++) {
        target = paths[i];
        try {
            if (fs.statSync(target).isDirectory()) {
                targetDir = target;
                break;
            }
        } catch (e) {
            // no path
        }
    }

    return targetDir;
};

/**
 * Validates each item in the array is a `RegExp` instance
 * and if not it creates a new `RegExp` for the item and
 * stores it in the array index.
 *
 * @param array
 * @returns
 * @api private
 */
function asRegExps(array) {
    var array = asArray(array), len = array.length;
    for (var i = 0; i < len; i++) {
        if (!(array[i] instanceof RegExp)) {
            array[i] = new RegExp(array[i]);
        }
    }
    return array;
}

/**
 * Returns the default options for this module merged
 * with the given options passed to this function.
 *
 * The defaults are as follows:
 * - grep: any file ending in `.js`
 * - ungrep: any path including `node_modules`
 * - scope: an empty object
 * - recurse: true
 * - targets: return value from `defaultTargets()`
 *
 * @param {Object} opts The options to merge the defaults into.
 * @param {String} parentId The path of the requiring module.
 * @returns {Object} The merged options.
 * @api private
 */

function defaultOpts(opts, parentId) {
    var targets = opts.targets && opts.targets.length
            ? asArray(opts.targets)
            : [defaultTarget(parentId)];

    return mixin({targets: targets,
            grep: [/\.js$/],
            ungrep: opts.ungrep && opts.ungrep.length
                    ? asArray(opts.ungrep)
                    : defaultUngrep(targets),
            scope: {},
            recurse: true},
            opts, true);
};


/*!
 * regex for node_modules path segment
 */

var NM_SEG = '(?:' + sep + '?node_modules' + sep + '|' + sep + '?node_modules$){1}';

/**
 * Escape the given string for windows style paths
 * by replacing `\` with `\\`.
 *
 * @param {String} str
 * @returns {String}
 * @api private
 */

function escape(str) {
    if (sep === '\\') {
        return str.replace(/\\/g, '\\\\');
    }
    return str;
};

/**
 * Build default ungrep pattern based on targets.
 *
 * @param {Array} targets
 * @returns {Array} The default ungrep regex in an array.
 * @api private
 */

function defaultUngrep(targets) {
    if (targets && targets.length) {
        var ungreps = [], target, len = targets.length;

        for (var i = 0; i < len; i++) {
            target = targets[i];
            target = '(?:^' + path.dirname(target) + sep + '){1}';
            target += '(?:/?.*/?)*' + NM_SEG;
            ungreps.push(new RegExp(escape(target)));
        }
        return ungreps;
    }
    return [new RegExp(escape(NM_SEG))];
};

module.exports = function(callerId) {
    var parentId = callerId;

    /**
     * Expose exports from other modules based on the given `options`.
     *
     * The `options` object supports the following properties:
     *
     * `targets` The target path(s) to expose. This can be an
     * array or a single file/dir. If not specified will
     * use the precedence as noted in the jsdocs for `defaultTarget()`.
     *
     * `grep` A single or array of patterns which indicate
     * path inclusions to expose. The regex will be `test`ed
     * against each absolute file path in the `targets`. An
     * absolute path is considered a match if any of the `grep`
     * expressions match and none of the `ungrep` expressions
     * match.
     *
     * `ungrep` A single or array of patterns which indicate
     * path exclusions for expose. The regex will be `test`ed
     * against each absolute file path in the `targets`. An
     * absolute path is considered a match if any of the `grep`
     * expressions match and none of the `ungrep` expressions
     * match. By default any sub-directory named `node_modules`
     * under the callers module path will be ignored. If you specify
     * any `ungrep`, your value(s) are used instead.
     *
     * `scope` The namespace scope to expose the exports on. For
     * example this can be the callers `exports` object. If not
     * specified an empty plain object is used and returned.
     *
     * `recurse` A `boolean` indicating if expose should recurse
     * any sub-directories. By default this is set to `true`.
     *
     * `fn` A callback `Function` to invoke for each property imported
     * during the expose process. The callback is invoked with 3 arguments
     * as follows `fn(module, propName, propVal)` where `module` is the
     * stripped (no path or extension) name of the module being imported,
     * `propName` is the name of the property being imported and `propVal`
     * is the actual value being imported.
     *
     * @param {Object} options The options object to use for expose.
     * @returns {Object} The `scope` object which now contains the exposed exports.
     * @api public
     */

    return function(options) {
        var opts = defaultOpts(options || {}, parentId),
            targets = asArray(opts.targets), len = targets.length;

        opts.grep = asRegExps(opts.grep);
        opts.ungrep = asRegExps(opts.ungrep);

        debug("Expose with options:\n", opts);

        for (var i = 0; i < len; i++) {
            load(targets[i], opts);
        }

        return opts.scope;
    };
};
