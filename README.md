# notes
Several js files use require; in order for them to be incorporated into the extension, they have to be "bundled" using browserify.

1. `npm install browserify`
2. `browserify FILE.js > bundled\FILE.js`
3. use bundled version of the file in html.
