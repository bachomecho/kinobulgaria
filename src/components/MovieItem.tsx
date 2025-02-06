import { Plus, Minus } from "lucide-react";
import { addMovieWatchlist, removeMovieWatchlist } from "../App";
import { useState } from "react";
import Button from "@mui/material/Button";
import { IWatchlistLengthState, Movie } from "../types/types";
import MovieButtons from "./MovieButtons";

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
                        <MovieButtons {...props} />
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
                                        props.setWatchlistLength(
                                            (prev: number) => prev + 1
                                        );
                                    }}
                                    disabled={props.watchlistLength >= 5}
                                >
                                    <Plus />
                                </Button>
                            ) : (
                                <Button
                                    className="watchlist-btn"
                                    variant="contained"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeMovieWatchlist(
                                            userUuid,
                                            props.title
                                        );
                                        props.setWatchlistLength(
                                            (prev: number) => prev - 1
                                        );
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
