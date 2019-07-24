# zip-text-nodes [![Build Status](https://api.travis-ci.com/fregante/zip-text-nodes.svg?branch=master)](https://travis-ci.com/fregante/zip-text-nodes)

> Merge the DOM of 2 elements with the same textContent.

Given 2 elements:

```html
Hello, <strong>world!</strong>
```

and:

```html
<em>Hello</em>, world!
```

they are merged into:

```html
<em>Hello</em>, <strong>world!</strong>
```

This can be useful when running some transformations on the content of an element and successively merging the results or restoring the original markup.

```js
const base = <>I live in <a href="it">Italy</a></>;
const grammar = highlightVerb(base);
// <>I <em>live</em> in Italy</> // e.g. the link was lost

zipTextNodes(base, grammar);
// <>I <em>live</em> in <a href="it">Italy</a></>
// The new `em` is copied from `grammar` to `base`
```

Supports overlapping and nested elements.


## Install

```
npm install zip-text-nodes
```


## Setup

```js
const zipTextNodes = require('zip-text-nodes');
```

```js
import zipTextNodes from 'zip-text-nodes';
```


## API

### zipTextNodes(target, source)

#### target

Type: `Element` `DocumentFragment`

The element into which the new children are copied. This element is modified.

#### source

Type: `Element` `DocumentFragment`

The element from which the new children are copied.

# Related

- [insert-text-textarea](https://github.com/fregante/insert-text-textarea) - Insert text in a textarea (supports Firefox and Undo).
- [fit-textarea](https://github.com/fregante/fit-textarea) - Automatically expand a `<textarea>` to fit its content, in a few bytes.
- [delegate-it](https://github.com/fregante/delegate-it) - DOM event delegation, in <1KB.
