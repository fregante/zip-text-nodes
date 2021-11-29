# <img align="right" width="350" src="https://user-images.githubusercontent.com/1402241/143927245-d92f27a8-a3c5-4195-a29a-bfea2271023d.png"> zip-text-nodes [![][badge-gzip]][link-bundlephobia]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/zip-text-nodes.svg?label=gzipped
[link-bundlephobia]: https://bundlephobia.com/result?p=zip-text-nodes

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
