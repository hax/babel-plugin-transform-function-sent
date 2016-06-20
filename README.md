# babel-plugin-transform-function-sent

Patch [function.sent meta property](https://github.com/allenwb/ESideas/blob/master/Generator%20metaproperty.md)


[![npm version](https://badge.fury.io/js/babel-plugin-transform-function-sent.svg)](https://badge.fury.io/js/babel-plugin-transform-function-sent)
[![build status](https://travis-ci.org/hax/babel-plugin-transform-function-sent.svg?branch=master)](https://travis-ci.org/hax/babel-plugin-transform-function-sent)
[![dependencies](https://david-dm.org/hax/babel-plugin-transform-function-sent.svg)](https://david-dm.org/hax/babel-plugin-transform-function-sent)
[![devDependencies](https://img.shields.io/david/dev/hax/babel-plugin-transform-function-sent.svg)](https://david-dm.org/hax/babel-plugin-transform-function-sent#info=devDependencies)


## Why this plugin

The official transform-regenerator plugin already support `function.sent`, but
require generators to be transformed. Many people avoid use regenerator,
because all JavaScript engines already support ES2015 generators natively, and
major browsers / node 0.12+ already ship generators for years.
(See also https://github.com/alekseykulikov/babel-preset-es2015-node5/issues/3
for similar discussion and result plugin [transform-es2015-generator-return](https://github.com/hax/babel-plugin-transform-es2015-generator-return))

If you are one of them, this plugin is for you. It only patch `function.sent`,
and will not touch other parts of your source code.


## Installation
```sh
npm install babel-plugin-transform-function-sent
```

## Usage

### Via `.babelrc` (Recommended)
#### .babelrc
```json
{
	"plugins": ["transform-function-sent"]
}
```

### Via CLI
```sh
babel --plugins transform-function-sent
```

### Via Node API
```js
require("babel-core").transform("code", {
  plugins: ["transform-function-sent"]
})
```

### Use with `transform-es2015-function-name`
**NOTE:** Please put `transform-es2015-function-name` before this plugin.
Sample:
```json
{
	"plugins": ["transform-es2015-function-name", "transform-function-sent"]
}
```
