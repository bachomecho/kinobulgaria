export default function MovieItem(props: Movie) {
	let thumbnailSource: string = `/images/${props.thumbnail_name}.jpg`;
	let youtubeIconSource: string = "/icons/youtube.png";
	let wikipediaIcon: string = "/icons/wikipedia.png";

	if (import.meta.env.VITE_ENVIRONMENT === "DEV") {
		thumbnailSource = "/assets/static" + thumbnailSource;
		youtubeIconSource = "/assets/static" + youtubeIconSource;
		wikipediaIcon = "/assets/static" + wikipediaIcon;
	}
	return (
		<>
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<img
					src={thumbnailSource}
					alt="Movie Poster"
					width="400"
					height="600"
					className="w-full h-[300px] object-cover aspect-ratio: 400 / 600; object-fit: cover"
				/>
				<div className="p-4">
					<h2 className="text-xl font-bold mb-2">{props.title}</h2>
					<p className="text-gray-600 mb-1 line-clamp-3">
						Времетраене: {props.duration} минути
					</p>
					<p className="text-gray-600 mb-1 line-clamp-3">
						Режисъор: {props.director}
					</p>
					<p className="text-gray-600 mb-1 line-clamp-3">
						Премиера: {props.release_year} година
					</p>
					<p className="text-gray-600 mb-2 line-clamp-3">Жанр: {props.genre}</p>
					<div className="flex justify-between items-center">
						<button className="inline-flex items-center w-1/2 justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
							<a
								href={`https://www.youtube.com/watch?v=${props.video_id}`}
								className="inline-flex items-center"
								target="_blank"
							>
								<img
									src={youtubeIconSource}
									className="fill-current w-4 h-4 mr-2"
								/>
								YouTube
							</a>
						</button>
						<button className="inline-flex items-center w-1/2 justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
							<a
								href={`https://bg.wikipedia.org/wiki/${props.title.replace(
									" ",
									"_"
								)}`}
								className="inline-flex items-center"
								target="_blank"
							>
								<img
									src={wikipediaIcon}
									className="fill-current w-4 h-4 mr-2 -ml-1"
								/>
								Wikipedia
							</a>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
