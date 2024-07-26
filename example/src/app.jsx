import React from "react";

import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import Gallery from "./components/Gallery/Gallery";

import appStyles from "./app.component.scss";

const App = () => {
	return (
		<>
			<Header />
			<div className="app" data-style={appStyles}>
				<article>
					<h3>This website demonstrates the possibilities of the webpack-scoped-css plugin</h3>
					<p>
						On this page you can see that the header up top has the same class as the card headings. Thanks to
						the scoping, their styles don't conflict with each other. Similarly you can see that the{" "}
						<pre>grid</pre> class is used for both the posts and gallery, and yet their styles are different
						(inspect to see the difference).
					</p>
					<p>
						This example has the <pre>scopeEnd</pre> option set to <pre>scope</pre> (default), which means that
						the styles of a parent scope, don't leak into the lower scopes. To test this, simply add{" "}
						<pre>* &#123; border: 2px solid red; &#125;</pre> inside the <pre>.app</pre> selector
						(app.component.scss). You'll notice the border surrounds all elements except those that have their
						own scope and their children (that is: each card and the gallery component). If this behavior in't
						desired, you can set the <pre>scopeEnd</pre> option to <pre>tree</pre>, which will scope the styles
						until the bottom of the component tree.
					</p>
				</article>
				<section>
					<h1>
						Latest posts <pre>className="grid"</pre>
					</h1>
					<div className="grid">
						<Card header="Lorem ipsum">
							dolor sit amet consectetur adipisicing elit. Illo commodi, deleniti temporibus explicabo.
							<ul>
								<li>The scoping works</li>
								<li>even with deep nesting</li>
							</ul>
						</Card>
						<Card header="Lorem ipsum">
							dolor sit amet consectetur adipisicing elit. Illo commodi, deleniti temporibus explicabo facilis
							laborum praesentium eos, a pariatur fugiat quo impedit quod ipsam animi.
						</Card>
						<Card header="Lorem ipsum">
							dolor sit amet consectetur adipisicing elit. Illo commodi, deleniti temporibus explicabo facilis
							laborum praesentium eos, a pariatur fugiat quo impedit quod ipsam animi.
						</Card>
						<Card header="Lorem ipsum">
							dolor sit amet consectetur adipisicing elit. Illo commodi, deleniti temporibus explicabo facilis
							laborum praesentium eos, a pariatur fugiat quo impedit quod ipsam animi.
						</Card>
					</div>
				</section>
				<section>
					<h1>
						Gallery <pre>className="grid"</pre>
					</h1>
					<Gallery />
				</section>
			</div>
		</>
	);
};

export default App;
