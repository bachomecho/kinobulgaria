import youtubeIcon from "/assets/static/icons/yt_icon_black.png";
import wikipediaIcon from "/assets/static/icons/wikipedia.png";
import { Plus, Minus } from "lucide-react";
import { addMovieWatchlist, removeMovieWatchlist } from "../App";
import { useState } from "react";
import Button from "@mui/material/Button";
import { IWatchlistLengthState, Movie } from "../types/types";

export default function MovieItem(props: Movie & IWatchlistLengthState) {
	const quotientDuration = Math.floor(props.duration / 60);
	const formattedDuration = `${quotientDuration} ${
		quotientDuration == 1 ? "час" : "часа"
	} и ${props.duration % 60} минути`;

	const [inWatchlist, setInWatchlist] = useState(props.isInWatchlist);
	const userUuid = localStorage.getItem("userUuid") || null;

	return (
		<>
			<div
				className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
				onClick={props.modalOpenClosedMethod}
			>
				<img
					src={`/images/${props.thumbnail_name}.jpg`}
					alt="Movie Poster"
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
							className="yt-btn flex items-center justify-center 2xl:justify-start gap-2 ring-offset-background"
							target="_blank"
							onClick={(e) => e.stopPropagation()}
							title="Филма в ютуб"
						>
							<img src={youtubeIcon} className="w-4 h-4 2xl:ml-4" />
							<span className="hidden 2xl:block">Youtube</span>
						</a>
						<a
							href={`https://bg.wikipedia.org/wiki/${props.title.replace(
								" ",
								"_"
							)}`}
							className="wiki-btn flex items-center justify-center 2xl:justify-start gap-2 ring-offset-background"
							target="_blank"
							onClick={(e) => e.stopPropagation()}
							title="Информация за филма"
						>
							<img src={wikipediaIcon} className="w-4 h-4 2xl:ml-4" />
							<span className="hidden 2xl:block">Wikipedia</span>
						</a>
						{userUuid &&
							(!inWatchlist ? (
								<Button
									className="watchlist-btn"
									onClick={(e) => {
										e.stopPropagation();
										addMovieWatchlist(
											userUuid,
											props.title,
											props.thumbnail_name,
											props.video_id,
											props.release_year
										);
										setInWatchlist(true);
										props.setWatchlistLength((prev: number) => prev + 1);
									}}
									disabled={props.watchlistLength >= 5 ? true : false}
								>
									<Plus />
								</Button>
							) : (
								<Button
									className="watchlist-btn"
									variant="contained"
									onClick={(e) => {
										e.stopPropagation();
										removeMovieWatchlist(userUuid, props.title);
										props.setWatchlistLength((prev: number) => prev - 1);
										setInWatchlist(false);
									}}
								>
									<Minus />
								</Button>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
