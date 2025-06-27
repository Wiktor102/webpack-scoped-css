import React from "react";

import Header from "./components/Header/Header";
import Card, { SpecialCard } from "./components/Card/Card";
import Gallery from "./components/Gallery/Gallery";

import appStyles from "./app.component.scss";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";

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
					<h3>
						Update v0.2.0: the <pre>@scope</pre> rule
					</h3>
					<p>
						The new at-rule allows customization of the plugin's behavior per file. For example by placing a{" "}
						<pre>@scope tree;</pre> at-rule on the first line of any .component.(s)css file, you can make that
						file applicable to all lower scopes although all other files are processed with the setting of
						"scope". The opposite can also be achieved.
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
						<SpecialCard header="Special card">
							This card has an extra element that wraps the original card component. In order to use the same
							stylesheet for both cards, the <i>data-style</i> attribute is also applied to the wrapper
							element.
						</SpecialCard>
					</div>
				</section>
				<section>
					<h1>
						Gallery <pre>className="grid"</pre>
					</h1>
					<Gallery />
				</section>
				<section>
					<Form />
				</section>
				<Footer />
			</div>
		</>
	);
};

export default App;
