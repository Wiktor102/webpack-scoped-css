const path = require("path");

/**
 * This function generates an array of webpack loaders for CSS scoping.
 * It is used to apply CSS scoping techniques to components in a project.
 *
 * @param {object} cssScopeOptions - An object containing options for CSS scoping.
 * @param {boolean} [sass=false] - A flag indicating whether to include the 'sass-loader'.
 * @param {object|null} [postCssLoader=null] - Optionally provide a postCSS loader.
 *
 * @returns {Array} An array of webpack loaders for CSS scoping.
 */
function getCssLoaders(cssScopeOptions, sass = false, postCssLoader = null) {
	let i = 1;
	const getScopedCssLoaders = (loaders = []) => {
		const id = `scope-${i++}`;

		return [
			{
				loader: path.resolve(__dirname, "./scopedCssModulesLoader.js"),
				ident: id,
				options: {
					componentId: cssScopeOptions.componentId ?? id
				}
			},
			"style-loader",
			"css-loader",
			{
				loader: path.resolve(__dirname, "./cssScopeLoader.js"),
				ident: id,
				options: {
					componentId: id,
					...cssScopeOptions
				}
			},
			...loaders
		];
	};

	return {
		oneOf: [
			{
				test: /\.component\.css$/,
				use: () => getScopedCssLoaders([postCssLoader && postCssLoader].filter(Boolean))
			},
			sass && {
				test: /\.component\.(scss|sass)$/,
				use: () => getScopedCssLoaders([postCssLoader && postCssLoader, "sass-loader"].filter(Boolean))
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", postCssLoader && postCssLoader]
			},
			sass && {
				test: /\.(scss|sass)$/,
				use: ["style-loader", "css-loader", "sass-loader", postCssLoader && postCssLoader]
			}
		].filter(Boolean)
	};
}

module.exports = {
	getCssLoaders,
	WebpackCssScopeLoader: require("./cssScopeLoader"),
	WebpackScopedCssModulesLoader: require("./scopedCssModulesLoader")
};
