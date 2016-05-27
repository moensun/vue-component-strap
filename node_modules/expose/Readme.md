[![Build Status](https://secure.travis-ci.org/bodenr/expose.png)](http://travis-ci.org/bodenr/expose)
# expose

A [node.js](http://nodejs.org) module allowing you to search and
expose module `exports` onto a given namespace. This can be useful
for example if you want to organize functions in respective modules
(js files) but expose all of them onto a single index module for 
easier consumability.

## Installation

Install using `npm`:

    $ npm install expose

## Running the tests

From the `expose` directory first install the dev dependencies:
```
npm install
```

Then run the tests:
```
npm test
```

## API Docs

The API docs are provided in html and md format and are located under
`expose/docs/`. If you want to rebuild them for any reason, you can
run the following from the `expose` directory:
```
make doc
```

## Usage

The `expose` module exports a single function, so the return value from
a `require(expose)` is the expose function itself.

```
var expose = require('expose');
```

The function accepts a single argument - an options style object to 
configure itself and tries to take sensible defaults when you 
don't provide an option.

### The following options are supported:

`targets` - The target path(s) to expose. This can be a single path string
or an `Array` of path strings. If `targets` is not specified, expose will
look for a `lib` or `src` directory under the module that `require`d it.
If neither of those are found under the `require`ing module's directory,
it will look for them under the grandparent directory. Finally, if all
else fails expose will use `process.cwd()`.

`grep` - The patterns which define path 
inclusions to expose. By default all files under the `targets` which 
end in `.js` will be exposed. A path is considered a match is any of
the `grep` expressions match the absolute path and none of the `ungrep`
expressions match.

`ungrep` - The patterns which define
path exlusions for expose. By default any subdirectory under `targets`
which contains a `node_modules` dir will be excluded. A path is considered 
a match is any of the `grep` expressions match the absolute path and 
none of the `ungrep` expressions match.

`scope` - The namespace scope to expose exports on. For example the callers
`exports` object. If no `scope` is specified a plain JSON object will be
created and returned.

`recurse` - A `boolean` indicating if expose should recurse into subdirectories
under the `targets`. By default this is set to `true`.

`fn` - A callback `Function` to invoke for each property imported during the
expose process. The callback is invoked with 3 arguments
as follows `fn(module, propName, propVal)` where `module` is the
stripped (no path or extension) name of the module being imported,
propName` is the name of the property being imported and `propVal`
is the actual value being imported.

### Examples

Expose all exports found in .js files under the current module's `./lib` dir
(except those found under a /node_modules directory):
```js
exports = expose();
```

Equivalent to the above:
```js
expose({scope: exports});
```

Same as above, but invoke the `echo` function for each property exposed:
```js
function echo(mod, name, val) {
    console.log("Module name: " + mod);
    console.log("Property name: " + name);
    console.log("Property value: " + val);
};
expose({scope: exports, fn: echo});
```

Expose all exports in `.js` files under the current module's `lib` dir, 
but don't recurse into sub-dirs:
```js
exports = expose({recurse: false});
```

Expose all exports in files ending in `a.js` under the current module's `lib` dir:
```js
exports = expose({grep: /a.js$/});
```

Same as above, but let `expose` create the `RegExp`:
```js
exports = expose({grep: 'a.js'});
```

Expose all exports for `.js` files under the current module's `lib` dir that don't 
end in `a.js`:
```js
exports = expose({ungrep: /a.js$/});
```

Expose all exports for `.js` file under specific sub-directories:
```js
exports = expose({targets: ['./test/defaults/lib/inc',
                            './test/defaults/lib/node_modules'],
                            ungrep: []});
```

## License

(The MIT License)

Copyright (c) 2012 Boden Russell &lt;bodensemail@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
