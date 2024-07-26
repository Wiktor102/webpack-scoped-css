import style from "./Gallery.component.scss";

function Gallery() {
	return (
		<div className="grid" data-style={style}>
			{new Array(8).fill("https://picsum.photos/400").map((url, i) => <img src={url} alt="" key={i} />)}
		</div>
	);
}

export default Gallery;