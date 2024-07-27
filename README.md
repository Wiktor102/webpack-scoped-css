# Webpack-Scoped-Css
## How does it work?
This package is a hybrid between css-modules and the scoped-css-loader plugin. It consists of 2 separate loaders. The 1st appends attribute selectors to rules in `.component.css` (or sass or scss) files. The scope names are then exported from the stylesheet using the 2nd loader and need to be **manually** added to the desired dom nodes. You can use the same scope in multiple places if you wish. There is no need to repeat the scope on the children of an element that already has it as the `data-style` attribute actually marks the **start** of the scope. Using default settings (`scopeEnd: "scope"`), the sope ends where another one begins. If you want the scopes to continue until the very bottom of the tree, set `scopeEnd: "tree"`.

## Some background
I created this package as other available scoped css solutions didn't satisfy me. Up to this point, I've been using the [scoped-css-loader](https://github.com/gaoxiaoliangz/react-scoped-css), which worked great but is now outdated (hasn't been updated for 5 years) and doesn't support modern css features (such as `@container` queries). Also, the mentioned loader works per file rather than per component which isn't ideal. Why not [css-modules](https://github.com/css-modules/css-modules) you might ask? Well, they require every element to have a class name and I feel this is cumbersome to use.

## Install & setup
```bash
npm i webpack-scoped-css -D

# If using method 1, also install:
npm i css-loader style-loader -D
npm i sass sass-loader -D # For sass/scss support
```
After installing the package(s), you can set up your webpack configuration in 2 different ways:
1. Use the `getCssLoaders` function provided by this package. It's a single function that takes care of all css-related loaders. Simply import it, and include its execution in the `module.rules` array. This function takes up to 3 arguments: `options`, `sass`, and `postCssLoader`. For a detailed description of these options, see the documentation. Here is a sample:
```js
module.exports = {
  // Other options
	module: {
		rules: [
			// ... rules for other file types,

			getCssLoaders({}, true) // You can drop the 2nd argument if you don't need sass/scss
		],
	},
	// Other options
};
```
**Note: Be sure to remove any other rules related to css files as this might cause issues. _The `getCssLoaders` function handles both scoped and unscoped files._**

2. If you need more flexibility in your configuration, you can write your own set of rules.  You can import both loaders using:
```js
const { WebpackCssScopeLoader, WebpackScopedCssModulesLoader } = require('webpack-scoped-css');
```
Then use them inside the rules for scoped css files. Just be sure that the `WebpackScopedCssModulesLoader` is executed last and that `WebpackCssScopeLoader` is before the `css-loader`. To generate unique IDs for each component, you'll most likely need to provide a function as the `rule.use` property. You can look up how to do this in the source code of this package.
**Remember: webpack executes loaders in reverse order, so the last loader in the array runs first!**

## Setting up scopes
This package was built with React in mind, but will probably work in any project where you can import css files.
```scss
// MyComponent.component.scss
.card {
  padding: 2rem;
  background-color: skyblue;
  border-radius: 15px;

  // For scoping to work, all elements inside the scope must be nested at least 1 level deep
  h2 {
    margin-top: 0;
    font-familly: "Comic Sans MS";
  }
}

// This won't work (unless the h2 has the data-style attribute assigned)
h2 {
  color: red;
}
```
```jsx
// MyComponent.jsx
import myStylesScope from "./MyComponent.component.scss";

function MyComponent (props) {
  // Notice the data-style attribute below:
  return <div className="card" data-style={myStylesScope}>
    <h2>{props.header}</h2>
    {...props.children}
  </div>

export default MyComponent;
```
For a more advanced scenario, see the example code, or even better run it yourself (instructions below).

## Running the example (or for plugin development)
1. clone the repository `git clone https://github.com/Wiktor102/webpack-scoped-css.git`
2. `cd webpack-scoped-css`
3. `npm i`
4. `cd example`
5. `npm i`
6. `npm run start`

Hot reloading is enabled. **Note:** If you make changes to the plugin or the Webpack configuration, you need to kill the process and run `npm run start` again.

## Documentation
### function `getCssLoaders(cssScopeOptions, sass = false, postCssLoader = null)`
This function is the easiest way to set up webpack loaders for __css and scoped css__.
* `cssScopeOptions: object` - Required. An empty object might be provided if you don't wish to use any options. See `WebpackCssScopeLoader` options for details.
* `sass: bool? = false` - If true, rules for loading `.sass`, `.scss`, `.component.sass`, and `.component.sass` will be included.
* `postCssLoader: object|string? = null` - If provided this loader will be included at the end of the loaders list for all css rules. This can be used to provide a `postcss-loader` with custom options (normally, postcss isn't included).

### WebpackCssScopeLoader options
* `componentId: string` - Required (only if using the loader directly). A unique ID to identify the scope/component.
* `attribute: string = "data-style"` - Specifies what attribute will be used to identify the scope.
* `scopeEnd: "scope"|"tree" = "scope"` - Specify where the scope ends:
  - `scope` - The default. Using this setting, the scope ends where another scope begins. That is - the styles of the parent scope do not "leak" into the children that have their own scope. This is done using complex css selectors, so performance may be decreased. **Note: some css properties may still affect the children scope if they're inherited (ex. font, color, etc.)!**
  - `tree` - The scope continues until the very bottom of the DOM. Styles of the parent scope may affect elements in the lower/deeper scopes.

### WebpackScopedCssModulesLoader options
* `componentId: string` - Required. A unique ID to identify the scope/component. It must be the same as the `componentId` provided to the WebpackCssScopeLoader for each file.

