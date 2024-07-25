const { validate } = require('schema-utils');

const schema = {
	type: 'object',
	properties: {
		componentId: {
			type: 'string',
		},
	},
};


module.exports = function (source) {
	const options = this.getOptions();

	validate(schema, options, {
		name: 'scoped-css-modules-loader',
		baseDataPath: 'options',
	});

	const newSource = source.split("\n").slice(0, -2).join("\n") + `\nexport default "${options.componentId}";`;
	return newSource;
}