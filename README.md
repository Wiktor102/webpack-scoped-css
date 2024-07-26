# Webpack-Scoped-Css
## How does it work?
This plugin is a hybrid between css-modules and the scoped-css-loader plugin. It appends attribute selectors to `.component.css` (or sass or scss) files. The scope names are then exported from the stylesheet and need to be **manually** added to the desired dom nodes. You can use the same scope in multiple places if you wish. There is no need to repeat the scope on the children of an element that already has it as the `data-style` attribute actually marks the **start** of the scope. Using default settings (`scopeEnd: "scope"`), the sope ends where another one begins. If you want the scopes to continue until the very bottom of the tree, set `scopeEnd: "tree"`.

## Install & setup
Instructions coming soon

## Some background
I created this plugin as other available scoped css solutions didn't satisfy me. Up to this point, I've been using the [scoped-css-loader](https://github.com/gaoxiaoliangz/react-scoped-css), which worked great but is now outdated (hasn't been updated for 5 years) and doesn't support modern css features (such as `@container` queries). Also, the mentioned loader works per file rather than per component which isn't ideal. Why not [css-modules](https://github.com/css-modules/css-modules) you might ask? Well, they require every element to have a class name and I feel this is cumbersome to use.

## Running the example (or for plugin development)
1. clone the repository `git clone https://github.com/Wiktor102/webpack-scoped-css.git`
2. `cd webpack-scoped-css`
3. `npm i`
4. `cd example`
5. `npm i`
6. `npm run start`

Hot reloading is enabled. **Note:** if you make changes to the plugin or the Webpack configuration, you need to kill the process and run `npm run start` again.

## Documentation
Coming soon. For now please use the example for reference.
