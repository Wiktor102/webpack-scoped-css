import styles from "./Header.component.scss";

function Header() {
	return (
		<header className="header" data-style={styles}>
			<h1>Webpack-Scoped-CSS example</h1>
			<pre>className="header"</pre>
		</header>
	);
}

export default Header;