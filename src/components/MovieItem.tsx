import "./css_files/MovieItem.css";

function MovieItem(props: MovieProps) {
	let thumbnailSource: string = `/assets/static/images/${props.thumbnail_name}.jpg`;
	if (import.meta.env.VITE_ENVIRONMENT === "PROD") {
		thumbnailSource = "/images/" + props.thumbnail_name + ".jpg";
	}
	return (
		<>
			<img
				src={thumbnailSource}
				title={props.title}
				className="thumbnail grid"
				onClick={props.openModal}
				alt=""
			/>
		</>
	);
}

export default MovieItem;
