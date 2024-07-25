const { validate } = require('schema-utils');
const { parse, generate, toPlainObject, fromPlainObject, walk } = require('css-tree');

const schema = {
	type: 'object',
	properties: {
		componentId: {
			description: "Unique component ID.",
			type: 'string',
		},
		attribute: {
			description: "The name of the custom (data-*) attribute that will be used to scope the CSS. Default is 'data-style'.",
			type: 'string',
		},
		scopeEnd: {
			description: "Where the scope ends. Can be ether 'tree' or 'scope'. Default is 'scope'. See documentation for details. ",
			type: 'string',
		},
	},
};

module.exports = function (source) {
	const options = this.getOptions();

	validate(schema, options, {
		name: 'css-scope-loader',
		baseDataPath: 'options',
	});

	options.attribute ??= "data-style";
	options.scopeEnd ??= "scope";

	const id = options.componentId;
	const ast = toPlainObject(parse(source));

	const attributeSelector = {
		type: "AttributeSelector",
		loc: null,
		name: {
			type: "Identifier",
			name: options.attribute
		},
		matcher: "=",
		value: {
			type: "String",
			value: id
		},
		flags: null
	};

	const notAttributeSelector = {
		type: "PseudoClassSelector",
		name: "not",
		loc: null,
		children: [{
			type: "SelectorList",
			loc: null,
			children: [{
				type: "Selector",
				loc: null,
				children: [{
					type: "Selector",
					loc: null,
					children: [attributeSelector]
				}]
			}]
		}]
	}

	function modifySelector(selector) {
		let combinatorPos = selector.children.findIndex(node => node.type === 'Combinator');
		let hasCombinator = combinatorPos != -1;
		if (!hasCombinator) combinatorPos = selector.children.length;

		selector.children.splice(combinatorPos, 0, attributeSelector);

		if (!hasCombinator || options.scopeEnd === "scope") return selector;
		const secondCombinatorPos = selector.children.findIndex((node, index) => node.type === 'Combinator' && index !== combinatorPos + 1);
		if (secondCombinatorPos !== -1) {
			selector.children.splice(secondCombinatorPos, 0, notAttributeSelector);
		}

		return selector;
	}

	ast.children.forEach(rule => {
		if (rule.type === "Rule") {
			rule.prelude.children = rule.prelude.children.map(modifySelector);
		}

		if (rule.type === "Atrule") {
			console.log(rule)
			console.log(rule.block.children)
			rule.block.children.forEach(rule => {
				if (rule.type === "Rule") {
					rule.prelude.children = rule.prelude.children.map(modifySelector);
				}
			});
		}
	});

	const asClass = fromPlainObject(ast);
	const modifiedCss = generate(asClass);
	return `/* Component ID: ${id} */\n${modifiedCss}`;
}