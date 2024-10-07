import { useContext } from "react";
import { pathContext } from "../index";

export default function MovieItem(props: Movie) {
	const filePath = useContext(pathContext);
	const thumbnailSource = `${filePath}/images/${props.thumbnail_name}.jpg`;
	let youtubeIconSource: string = filePath + "/icons/yt_icon_black.png";
	let wikipediaIcon: string = filePath + "/icons/wikipedia.png";

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
							<img
								src={youtubeIconSource}
								className="fill-current w-4 h-4 mr-2"
							/>
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
