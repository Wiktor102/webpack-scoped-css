const { validate } = require("schema-utils");

const schema = {
	type: "object",
	properties: {
		componentId: {
			type: "string"
		},
		development: {
			type: "boolean"
		}
	}
};

module.exports = function (source) {
	const options = this.getOptions();

	validate(schema, options, {
		name: "scoped-css-modules-loader",
		baseDataPath: "options"
	});

	if (options.development) {
		const newSource = source.split("\n").slice(0, -2).join("\n") + `\nexport default "${options.componentId}";`;
		return newSource;
	} else {
		const newSource = source.split("\n").toSpliced(1, 1, `export default "${options.componentId}";`).join("\n");
		return newSource;
	}
};
