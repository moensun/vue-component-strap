

<!-- Start /home/boden/git/expose/lib/expose.js -->

## debug()

Print a debug statement to `console.log` if
`process.env.NODE_ENV` is set to `debug` or
`trace`.

 You can set the NODE_ENV in your calling code
 before `require`ing expose, or you can set it
 as an env variable prior to invoking `node`.

 Examples:

 process.env.NODE_ENV = 'debug';
 var expose = require('./lib/expose.js').expose;
 expose({...});
 // =&gt; debug messages

## mixin(src, dest, skipEmpty)

Perform a top level mixing between and source
and destination object optionally skipping
undefined/null properties.

## Examples

 mixin({a: 'A'}, {b: 'B});
 // =&gt; {a: 'A', b: 'B'}

 mixin({'a': null}, {b: 'B}, true);
 // =&gt; {b: 'B'}

### Params: 

* **Object** *src* 

* **Object** *dest* 

* **Boolean** *skipEmpty* 

## exists()

Determines if a value is non null
and defined.

### Params: 

* **o** ** 

## asArray()

Returns its argument as an array.

### Params: 

* **o** ** 

## toPath(dir, file)

Resolve and return an absolute path.

### Params: 

* **String** *dir* The directory

* **String** *file* The file in the directory

## test(target, grep, ungrep)

Given a target string, test the string against
an array of `RegExp` objects representing patterns
to include and an array of `RegExp` objects
representing patterns to exclude. Only return
`true` when one of the inclusive patterns test
and when none of the exlude patterns test.

### Params: 

* **String** *target* The string to test.

* **Array** *grep* An array of RegExp objects indicating inclusion.

* **Array** *ungrep* An array of RegExp objects indicating exclusion.

## importModule(module, scope, fn)

Import a module into the given scope there by
`require`ing the module and copying its exports
into the given scope object.

### Params: 

* **String** *module* The path to the module to require.

* **Object** *scope* The namespace to import the modules exports into.

* **Function** *fn* The optional callback function to invoke for each imported property.

## isPlainObject({Mixed})

Determine if the given object is a plain object.

### Params: 

* **obj** *{Mixed}* 

## load(target, opts)

Perform importing on the given target based on the
given options. The target can be a directory to
walk or it can be a file.

The `opts` passed in should be the same format
as those built with `defaultOpts`.

### Params: 

* **String** *target* The file or dir to target.

* **Object** *opts* The options to use for importing.

## grandparentDir()

Returns the grandparent module directory which
is assumed to be the requiring module.

## defaultTarget(parentId)

Build and return the default target directory to expose
by determining the first directory that exists in the
following order:
`dirname(parentId) + /lib`
`dirname(parentId) + /src`
`dirname(grandparentDir())/lib`
`dirname(grandparentDir())/src`
`process.cwd()`

### Params: 

* **String** *parentId* The path of the requiring module.

## defaultOpts(opts, parentId)

Returns the default options for this module merged
with the given options passed to this function.

## The defaults are as follows
- grep: any file ending in `.js`
- ungrep: any path including `node_modules`
- scope: an empty object
- recurse: true
- targets: return value from `defaultTargets()`

### Params: 

* **Object** *opts* The options to merge the defaults into.

* **String** *parentId* The path of the requiring module.

## escape(str)

Escape the given string for windows style paths
by replacing `\` with `\\`.

### Params: 

* **String** *str* 

## defaultUngrep(targets)

Build default ungrep pattern based on targets.

### Params: 

* **Array** *targets* 

Expose exports from other modules based on the given `options`.

The `options` object supports the following properties:

`targets` The target path(s) to expose. This can be an
array or a single file/dir. If not specified will
use the precedence as noted in the jsdocs for `defaultTarget()`.

`grep` A single or array of `RegExp` objects which indicate
path inclusions to expose. The regex will be `test`ed
against each absolute file path in the `targets`. An
absolute path is considered a match if any of the `grep`
expressions match and none of the `ungrep` expressions
match.

`ungrep` A single or array of `RegExp` objects which indicate
path exclusions for expose. The regex will be `test`ed
against each absolute file path in the `targets`. An
absolute path is considered a match if any of the `grep`
expressions match and none of the `ungrep` expressions
match. By default any sub-directory named `node_modules`
under the callers module path will be ignored. If you specify
any `ungrep`, your value(s) are used instead.

`scope` The namespace scope to expose the exports on. For
example this can be the callers `exports` object. If not
specified an empty plain object is used and returned.

`recurse` A `boolean` indicating if expose should recurse
any sub-directories. By default this is set to `true`.

`fn` A callback `Function` to invoke for each property imported
during the expose process. The callback is invoked with 3 arguments
as follows `fn(module, propName, propVal)` where `module` is the
stripped (no path or extension) name of the module being imported,
`propName` is the name of the property being imported and `propVal`
is the actual value being imported.

### Params: 

* **Object** *options* The options object to use for expose.

<!-- End /home/boden/git/expose/lib/expose.js -->

