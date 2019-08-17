/**
 * @module build/lib
 * 
 * This automates a shell script that builds the ES5 and ESNext
 * versions of the library that will be exported to `es5/` and
 * `lib/`, respectively.
 */

'use strict'
const shell = require('shelljs')

// remove any existing code in these directories
shell.rm('-rf', 'es5', 'lib', 'lib-temp')
// transpile `src/*.ts`; output to `lib-temp/*.js`; result is ESNext
shell.exec('yarn run tsc -p tsconfig.dist.json')
// use babel to convert ESNext into ES5; output to `es5/*.js`
shell.exec('yarn run cross-env NODE_ENV=es5 babel lib-temp --out-dir es5 --source-maps -q')
/**
 * TODO: Figure out why don't we need `index.js` in `lib/`?
 *       Is this something we should be doing in _our_ library?
 */
// overwrite `entry-lib.js` => `index.js`; 
shell.mv('./lib-temp/entry-lib.js', './lib-temp/index.js')
// use babel to convert ESNext into ???; output to `lib/*.js`
shell.exec('yarn run cross-env NODE_ENV=lib babel lib-temp --out-dir lib --source-maps -q')
