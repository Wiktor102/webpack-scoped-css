import styles from "./Card.component.scss";

function Card({ header, children }) {
	return (
		<div className="card" data-style={styles}>
			<h2 className="header">
				<span>{header}</span> <pre>className="header"</pre>
			</h2>
			<div className="body">{children}</div>
		</div>
	);
}

export default Card;
