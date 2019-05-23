/*
 * `index` means the character-index of a node relative to its main element,
 * regardless of other HTML elements in between.
 * Example: "Hello <i>World<b>!</b></i>"
 * The tag `b` and the exclamation mark are at index 11
 */
function getIndex(container: Node & ParentNode, target: Node): number {
	let index = 0;
	do {
		while (target.previousSibling) {
			index += target.previousSibling.textContent!.length;
			target = target.previousSibling;
		}

		target = target.parentElement!;
	} while (target && target !== container);

	return index;
}

// Get text node at an character index of an Element.
// Only needed because .setStart only accepts a character index relative to a single TextNode
function getNodeAtIndex(container: Node, index: number): [Node, number] {
	let relativeIndex = index;
	let cursor = container;
	while (cursor && cursor.firstChild) {
		cursor = cursor.firstChild;
		while (cursor && cursor.textContent!.length < relativeIndex) {
			relativeIndex -= cursor.textContent!.length;
			if (cursor.nextSibling) {
				cursor = cursor.nextSibling;
			}
		}
	}

	return [cursor, relativeIndex];
}

// Get Range that starts/ends across multiple/nested TextNodes of an Element.
// Only needed because .setStart only accepts a character index relative to a single TextNode
function getSmartIndexRange(node: Node & ParentNode, start: number, end: number): Range {
	const range = document.createRange();
	range.setStart(...getNodeAtIndex(node, start));
	range.setEnd(...getNodeAtIndex(node, end));
	return range;
}

/**
 * @example
 *
 * Merge two almost-identical elements like:
 * <div>a, <X>b</X>, c</div>
 * and:
 * <div>a, b, <X>c</X></div>
 * into:
 * <div>a, <X>b</X>, <X>c</X></div>
 *
 * Useful when `target` is subject to transforms that lose
 * its elements and you want to restore them.
 */
export = function (target: Node & ParentNode, source: Node & ParentNode): void {
	if (target.textContent !== source.textContent) {
		throw new Error('`target` and `source` must have matching `textContent`');
	}

	for (const child of source.querySelectorAll('*')) {
		const textIndex = getIndex(source, child);
		const newEl = child.cloneNode() as typeof child;
		const contentsRange = getSmartIndexRange(
			target,
			textIndex,
			textIndex + child.textContent!.length
		);
		newEl.append(contentsRange.extractContents());
		contentsRange.insertNode(newEl);
	}
};
