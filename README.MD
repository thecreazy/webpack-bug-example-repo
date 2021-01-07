# Example repo to reproduce webpack 5 bug

## step to reproduce

- install dependencies with yarn
- run npm run client:watch

## bug example

```bash
➜  webpack-bug-example-repo git:(master) ✗ npm run client:watch

> webpack-bug-example-repo@1.0.0 client:watch /Users/rcanella/Developer/opensource/webpack-bug-example-repo
> npx webpack --devtool eval-source-map --config webpack.client.js --watch --env PROCESS_WL=neewl

build [                    ] 0% (0.0 seconds)[webpack-cli] Compilation starting...
build [==                  ] 10% (0.0 seconds)(node:69266) ExperimentalWarning: Conditional exports is an experimental feature. This feature could change at any time
(node:69266) [DEP_WEBPACK_COMPILATION_OPTIMIZE_CHUNK_ASSETS] DeprecationWarning: optimizeChunkAssets is deprecated (use Compilation.hook.processAssets instead and use one of Compilation.PROCESS_ASSETS_STAGE_* as stage option)
build [==                  ] 10% (0.1 seconds)(node:69266) ExperimentalWarning: Package name self resolution is an experimental feature. This feature could change at any time
build [====================] 98% (5.0 seconds)[webpack-cli] Compilation finished
asset bundle.undefined.min.js 1.88 MiB [compared for emit] (name: bundle.undefined)
asset ../../public/css/neewl/global.undefined.min.css 150 KiB [compared for emit] (auxiliary name: bundle.undefined)
asset ../../public/css/neewl/macro.undefined.min.css 110 KiB [compared for emit] (auxiliary name: bundle.undefined)
asset ../../public/css/neewl/shared.undefined.min.css 106 KiB [compared for emit] (auxiliary name: bundle.undefined)
runtime modules 1.28 KiB 7 modules
modules by path ./node_modules/core-js/ 209 KiB 304 modules
modules by path ./node_modules/array.from/ 41.5 KiB 47 modules
modules by path ./node_modules/es-abstract/ 20.1 KiB 21 modules
modules by path ./src/ 16.3 KiB 9 modules
modules by path ./node_modules/array-includes/*.js 2.53 KiB 4 modules
modules by path ./node_modules/@babel/polyfill/ 1.26 KiB 3 modules
modules by path ./node_modules/object-keys/*.js 5.46 KiB 3 modules
modules by path ./node_modules/call-bind/*.js 1.26 KiB 2 modules
modules by path ./node_modules/function-bind/*.js 1.37 KiB 2 modules
modules by path ./node_modules/has-symbols/*.js 2.96 KiB 2 modules
modules by path ./node_modules/es-get-iterator/ 6.66 KiB 2 modules
modules by path ./node_modules/es-to-primitive/ 3.09 KiB 2 modules
17 modules
webpack 5.11.1 compiled successfully in 5041 ms
build [====================] 100% (5.1 seconds)

Build completed in 5.096s

[webpack-cli] watching files for updates...

build [                    ] 0% (5.4 seconds)[webpack-cli] Compilation starting...

===============================
FILES CHANGED:
===============================

===============================
FILES REMOVED:
  ../../../conf/json/sass.json
  macros/*
===============================
build [====================] 98% (0.5 seconds)[webpack-cli] Compilation finished
assets by status 1.88 MiB [cached] 1 asset
asset ../../public/css/neewl/global.undefined.min.css 150 KiB [emitted] (auxiliary name: bundle.undefined)
asset ../../public/css/neewl/macro.undefined.min.css 110 KiB [emitted] (auxiliary name: bundle.undefined)
asset ../../public/css/neewl/shared.undefined.min.css 106 KiB [emitted] (auxiliary name: bundle.undefined)
cached modules 381 KiB (javascript) 1.28 KiB (runtime) [cached] 425 modules
webpack 5.11.1 compiled successfully in 520 ms
build [====================] 100% (0.5 seconds)

Build completed in 0.534s

[webpack-cli] watching files for updates...
```

> the build id doing two times because the files ` ../../../conf/json/sass.json` and `macros/*` are delete but nobody delete that files.
