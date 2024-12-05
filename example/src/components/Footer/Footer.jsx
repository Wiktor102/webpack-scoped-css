import scope from "./Footer.component.scss";
import anotherScope from "./FooterContact.component.scss";

function Footer() {
	return (
		<footer data-style={scope}>
			<p>
				Thanks for using this plugin! <pre>footer scope</pre>
			</p>
			<div className="flex">
				<ul>
					<li>
						This list is in <pre>footer</pre> scope
					</li>
					<li>Lists in that scope are green</li>
					<li>
						This scope has <pre>@scope tree</pre>
					</li>
				</ul>
				<ul data-style={anotherScope}>
					<li>This is another list</li>
					<li>
						This list has a different scope: <pre>contact-info</pre>
					</li>
					<li>
						Both lists are selected using the <pre>ul</pre> selector, but only this one is bold
					</li>
					<li>whereas the color is preserved from the enclosing scope</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
