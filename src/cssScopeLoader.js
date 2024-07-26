const { parse, generate, toPlainObject, fromPlainObject, walk } = require("css-tree");
const { validate } = require("schema-utils");
const beautify = require("js-beautify");

const schema = {
	type: "object",
	properties: {
		componentId: {
			description: "Unique component ID.",
			type: "string"
		},
		attribute: {
			description:
				"The name of the custom (data-*) attribute that will be used to scope the CSS. Default is 'data-style'.",
			type: "string"
		},
		scopeEnd: {
			description:
				"Where the scope ends. Can be ether 'tree' or 'scope'. Default is 'scope'. See documentation for details. ",
			type: "string"
		}
	}
};

module.exports = function (source) {
	const options = this.getOptions();

	validate(schema, options, {
		name: "css-scope-loader",
		baseDataPath: "options"
	});

	options.attribute ??= "data-style";
	options.scopeEnd ??= "scope";

	const id = options.componentId;
	const ast = toPlainObject(parse(source));

	const attributeValueSelector = {
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

	const attributeSelector = {
		type: "AttributeSelector",
		loc: null,
		name: {
			type: "Identifier",
			name: options.attribute
		},
		matcher: null,
		value: null,
		flags: null
	};

	const notAttributeSelector = {
		type: "PseudoClassSelector",
		name: "not",
		loc: null,
		children: [
			{
				type: "SelectorList",
				loc: null,
				children: [
					{
						type: "Selector",
						loc: null,
						children: [
							{
								type: "Selector",
								loc: null,
								children: [attributeValueSelector]
							}
						]
					}
				]
			}
		]
	};

	const withoutAttributeSelector = {
		type: "PseudoClassSelector",
		name: "not",
		loc: null,
		children: [
			{
				type: "SelectorList",
				loc: null,
				children: [
					{
						type: "Selector",
						loc: null,
						children: [
							{
								type: "Selector",
								loc: null,
								children: [
									{
										type: "AttributeSelector",
										loc: null,
										name: {
											type: "Identifier",
											name: options.attribute
										},
										matcher: null,
										value: null,
										flags: null
									}
								]
							}
						]
					}
				]
			}
		]
	};

	const childCombinator = {
		type: "Combinator",
		loc: null,
		name: " "
	};

	const typeSelector = {
		type: "TypeSelector",
		loc: null,
		name: "*"
	};

	const not = children => ({
		type: "PseudoClassSelector",
		name: "not",
		loc: null,
		children: [
			{
				type: "SelectorList",
				loc: null,
				children
			}
		]
	});

	function modifySelector(selector) {
		let combinatorPos = selector.children.findIndex(node => node.type === "Combinator");
		let hasCombinator = combinatorPos != -1;
		if (!hasCombinator) combinatorPos = selector.children.length;

		selector.children.splice(combinatorPos, 0, attributeValueSelector);

		if (!hasCombinator || options.scopeEnd === "tree") return selector;
		const copy = selector.children.slice(combinatorPos + 1);
		selector.children.push(
			not([
				{
					type: "Selector",
					loc: null,
					children: [attributeSelector]
				},
				{
					type: "Selector",
					loc: null,
					children: [attributeValueSelector, childCombinator, attributeSelector, childCombinator, typeSelector]
				}
			])
		);
		return selector;
	}

	ast.children.forEach(rule => {
		if (rule.type === "Rule") {
			rule.prelude.children = rule.prelude.children.map(modifySelector);
		}

		if (rule.type === "Atrule") {
			rule.block.children.forEach(rule => {
				if (rule.type === "Rule") {
					rule.prelude.children = rule.prelude.children.map(modifySelector);
				}
			});
		}
	});

	const asClass = fromPlainObject(ast);
	const modifiedCss = generate(asClass);
	const formattedCss = beautify.css(modifiedCss);
	return `/* Component ID: ${id} */\n${formattedCss}`;
};
