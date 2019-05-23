const React = require('dom-chef');
const test = require('tape');
const mergeTextDom = require('.');

test('bring elements from source', t => {
	const target = <div>Hello world</div>;
	const source = <div>Hello <b>world</b></div>;
	mergeTextDom(target, source);
	t.equal(target.outerHTML, '<div>Hello <b>world</b></div>');
	t.end();
});

test('bring empty elements from source', t => {
	const target = <div>Hello world</div>;
	const source = <div>Hello world<i></i></div>;
	mergeTextDom(target, source);
	t.equal(target.outerHTML, '<div>Hello world<i></i></div>');
	t.end();
});

test('bring nested elements from source', t => {
	const target = <div>Hello world!</div>;
	const source = <div>Hello <b>world<i>!</i></b></div>;
	mergeTextDom(target, source);
	t.equal(target.outerHTML, '<div>Hello <b>world<i>!</i></b></div>');
	t.end();
});

test('bring elements from source and preserve existing ones', t => {
	const target = <div><b>Hello</b> world!</div>;
	const source = <div>Hello <b>world<i>!</i></b></div>;
	mergeTextDom(target, source);
	t.equal(target.outerHTML, '<div><b>Hello</b> <b>world<i>!</i></b></div>');
	t.end();
});

test('preserve empty elements position', {skip: true}, t => {
	const target = <div>Hello world</div>;
	const source = <div>Hello <i></i><b>world</b><s></s></div>;
	mergeTextDom(target, source);
	t.equal(target.outerHTML, '<div>Hello <i></i><b>world</b><s></s></div>');
	t.end();
});

test('avoid overlap of nearby elements', {skip: true}, t => {
	const target = <div><b>Hello</b> world!</div>;
	const source = <div>Hello<a> world!</a></div>;
	mergeTextDom(target, source);
	t.equal(target.outerHTML, '<div><b>Hello</b><a> world!</a></div>');
	t.end();
});

test('nest overlapping elements', t => {
	const target = <div><b>Hello world</b>!</div>;
	const source = <div>Hello <i>world</i>!</div>;
	mergeTextDom(target, source);
	t.equal(target.outerHTML, '<div><b>Hello <i>world</i></b>!</div>');
	t.end();
});

test('nest partially-overlapping elements', t => {
	const target = <div>Oh, <b>hello world</b>!</div>;
	const source = <div>Oh, hello <i>world!</i></div>;
	mergeTextDom(target, source);
	t.equal(target.outerHTML, '<div>Oh, <b>hello </b><i><b>world</b>!</i></div>');
	t.end();
});

test('support DocumentFragment target and source', t => {
	const target = <><b>Hello world</b>!</>;
	const source = <>Hello <i>world!</i></>;
	mergeTextDom(target, source);

	const helper = <div/>;
	helper.append(target);

	t.is(helper.innerHTML, '<b>Hello </b><i><b>world</b>!</i>');
	t.end();
});
