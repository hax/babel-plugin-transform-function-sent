# babel-plugin-transform-function-sent

Patch function.sent


[![npm version](https://badge.fury.io/js/babel-plugin-transform-function-sent.svg)](https://badge.fury.io/js/babel-plugin-transform-function-sent)
[![build status](https://travis-ci.org/hax/babel-plugin-transform-function-sent.svg?branch=master)](https://travis-ci.org/hax/babel-plugin-transform-function-sent)
[![dependencies](https://david-dm.org/hax/babel-plugin-transform-function-sent.svg)](https://david-dm.org/hax/babel-plugin-transform-function-sent)
[![devDependencies](https://img.shields.io/david/dev/hax/babel-plugin-transform-function-sent.svg)](https://david-dm.org/hax/babel-plugin-transform-function-sent#info=devDependencies)


## Why this plugin

transform-regenerator support function.sent. But many people avoid use it,
because all JavaScript engines already support ES2015 generators natively,
and major browsers / node 0.12+ already ship generators for years.
(See also https://github.com/alekseykulikov/babel-preset-es2015-node5/issues/3
for similar discussion and result plugin [transform-es2015-generator-return](https://github.com/hax/babel-plugin-transform-es2015-generator-return))

If you are one of them, this plugin is for you.

