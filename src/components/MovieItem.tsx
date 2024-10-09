import youtubeIcon from "/assets/static/icons/yt_icon_black.png";
import wikipediaIcon from "/assets/static/icons/wikipedia.png";
import conf from "../../pathConfig";

export default function MovieItem(props: Movie) {
	type Mode = "DEV" | "PROD";
	const thumbnailSource = `${
		conf[import.meta.env.VITE_ENVIRONMENT as Mode]
	}/images/${props.thumbnail_name}.jpg`;

	const quotientDuration = Math.floor(props.duration / 60);
	const formattedDuration = `${quotientDuration} ${
		quotientDuration == 1 ? "час" : "часа"
	} и ${props.duration % 60} минути`;
	return (
		<>
			<div
				className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
				onClick={props.modalOpenClosedMethod}
			>
				<img
					src={thumbnailSource}
					alt="Movie Poster"
					width="400"
					height="600"
					className="w-full h-[300px] object-cover aspect-ratio: 400 / 600; object-fit: cover"
					loading="lazy"
				/>
				<div className="p-4">
					<h2 className="text-xl font-bold mb-2">{props.title}</h2>
					<p className="text-gray-600 mb-1 line-clamp-3">
						Времетраене: {formattedDuration}
					</p>
					<p className="text-gray-600 mb-1 line-clamp-3">
						Режисъор: {props.director}
					</p>
					<p className="text-gray-600 mb-1 line-clamp-3">
						Премиера: {props.release_year} година
					</p>
					<p className="text-gray-600 mb-2 line-clamp-3">
						Жанр: {props.genre.split(",").join(", ")}
					</p>
					<div className="flex justify-between items-center">
						<a
							href={`https://www.youtube.com/watch?v=${props.video_id}`}
							className="yt-btn ring-offset-background"
							target="_blank"
							onClick={(e) => e.stopPropagation()}
						>
							<img src={youtubeIcon} className="fill-current w-4 h-4 mr-2" />
							YouTube
						</a>
						<a
							href={`https://bg.wikipedia.org/wiki/${props.title.replace(
								" ",
								"_"
							)}`}
							className="wiki-btn ring-offset-background"
							target="_blank"
							onClick={(e) => e.stopPropagation()}
						>
							<img
								src={wikipediaIcon}
								className="fill-current w-4 h-4 mr-2 -ml-1"
							/>
							Wikipedia
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
