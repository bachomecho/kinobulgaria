import { useEffect, useState, useRef, useCallback } from "react";
import MovieItem from "./MovieItem";
import Header from "./Header";
import Filter from "./Filter";
import Modal from "./Modal";
import { CircleArrowUp } from "lucide-react";
import {
	FilterProps,
	IWatchlistResponse,
	Movie,
	TFilterMethod,
	TSearchMethod,
	TWatchlist,
} from "../types/types";

const filterWithSearch: TSearchMethod = (movieState, searchState) => {
	if (searchState === "") {
		return movieState;
	} else {
		return movieState.filter((item) =>
			item.title.toLowerCase().includes(searchState.toLowerCase())
		);
	}
};

const durationBoundsMap = new Map<string, (elem: Movie) => boolean>([
	["до 1 час", (item) => item.duration <= 60],
	["1 - 1.5 часа", (item) => item.duration > 60 && item.duration <= 90],
	["1.5 - 2 часа", (item) => item.duration > 90 && item.duration <= 120],
	["над 2 часа", (item) => item.duration > 120],
]);

const filterWithFilter: TFilterMethod = (movieState, filterState) => {
	if (filterState.yearRange !== "") {
		const bounds = filterState.yearRange.split("-").map(Number);
		movieState = movieState.filter(
			(movie) =>
				movie.release_year >= bounds[0] && movie.release_year <= bounds[1]
		);
	}
	if (filterState.duration !== "") {
		const filterFunction = durationBoundsMap.get(filterState.duration);
		if (filterFunction) {
			movieState = movieState.filter(filterFunction);
		}
	}
	if (filterState.genre !== "") {
		movieState = movieState.filter((movie) =>
			movie.genre.includes(filterState.genre)
		);
	}
	return movieState;
};

const generateGenreList = (movies: Movie[]) => {
	const genreList = new Set<string>();
	movies.forEach((movie) => {
		movie.genre.includes(",")
			? movie.genre.split(",").forEach((genre) => genreList.add(genre))
			: genreList.add(movie.genre);
	});

	return Array.from(genreList);
};

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [search, setSearch] = useState<string>("");
	const [filter, setFilter] = useState<FilterProps>({
		yearRange: "",
		duration: "",
		genre: "",
	});
	const [removeFilters, setRemoveFilters] = useState<boolean>(false);
	const [scrollTop, setScrollTop] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<Movie>();
	const [modalOpen, setModalOpen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [userUuid, setUserUuid] = useState(
		localStorage.getItem("userUuid") || null
	);

	const initialMovies = useRef<Movie[]>([]);
	const genres = useRef<string[]>([]);
	genres.current = generateGenreList(initialMovies.current);

	const [watchlist, setWatchlist] = useState<TWatchlist[]>([]);
	const [watchlistLength, setWatchlistLength] = useState<number>(0);

	const titlesInWatchlist =
		watchlist.length > 0
			? watchlist.map((movie: TWatchlist) => movie.title)
			: [];

	useEffect(() => {
		const fetchMovies = fetch("/api/movies");
		const fetchWatchlist = fetch(`/api/watchlist/${userUuid}`);
		Promise.all([fetchMovies, fetchWatchlist])
			.then(([resMovies, resWatchlist]: [Response, Response]) => {
				if (!resWatchlist.ok || !resMovies.ok) {
					// if user is deleted unexpectedly in the database, while user is still logged in, this condition catches the faulty requests and rerenders component by setting user uuid
					localStorage.removeItem("userUuid");
					setUserUuid(null);
				}
				return Promise.all([resMovies.json(), resWatchlist.json()]);
			})
			.then(([dataMovies, dataWatchlist]: [Movie[], IWatchlistResponse]) => {
				if (dataWatchlist.loginStatus && dataWatchlist.watchlist) {
					const parsedWatchlist: TWatchlist[] = JSON.parse(
						dataWatchlist.watchlist.split("|").join(",")
					);
					setWatchlist(parsedWatchlist);
					setWatchlistLength(parsedWatchlist.length);
				}

				const availableMovies = dataMovies.filter(
					(movie: Movie) =>
						movie.video_id || movie.video_id_1 || movie.gledambg_video_id
				);
				initialMovies.current = availableMovies;
				setMovies(availableMovies);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	const toggleVisibility = () => {
		if (window.scrollY > 400) {
			setScrollTop(true);
		} else {
			setScrollTop(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	const isMobileChecker = () => {
		if (window.innerWidth <= 800) {
			setIsSmallScreen(true);
		} else {
			setIsSmallScreen(false);
		}
	};
	useEffect(() => {
		window.addEventListener("resize", isMobileChecker);
	}, []);

	const escFunction = useCallback((event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setModalOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", escFunction, false);

		return () => {
			document.removeEventListener("keydown", escFunction, false);
		};
	}, [escFunction]);

	useEffect(() => {
		if (search) {
			const filteredMovies = filterWithSearch(initialMovies.current, search);
			setMovies(filteredMovies);
		} else if (!Object.values(filter).every((val) => val === "")) {
			const filteredMovies = filterWithFilter(initialMovies.current, filter);
			setMovies(filteredMovies);
		} else {
			setMovies(initialMovies.current);
		}
	}, [search, filter.yearRange, filter.duration, filter.genre]);

	useEffect(() => {
		setSearch("");
		setFilter({ yearRange: "", duration: "", genre: "" });
		setRemoveFilters(false);
	}, [removeFilters]);

	return (
		<>
			<Header setSearchQuery={setSearch} showSearch={true} />
			<Filter
				filterState={filter}
				setFilterQuery={setFilter}
				setRemoveFilters={setRemoveFilters}
				genreList={genres.current}
			/>
			{!isSmallScreen && modalOpen && selectedMovie && (
				<Modal
					{...selectedMovie}
					modalOpenClosedMethod={() => setModalOpen(false)}
				/>
			)}
			{movies.length > 0 ? (
				<>
					<main className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
						<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{movies.map((item, index) => {
								return (
									<li>
										<MovieItem
											key={index}
											{...item}
											isInWatchlist={titlesInWatchlist.includes(item.title)}
											watchlistLength={watchlistLength}
											setWatchlistLength={setWatchlistLength}
											modalOpenClosedMethod={(e) => {
												e.preventDefault();
												setSelectedMovie(item);
												setModalOpen(true);
											}}
										/>
									</li>
								);
							})}
						</ul>
					</main>
				</>
			) : (
				<p className="flex items-center justify-center">Няма намерени филми</p>
			)}
			<div className="fixed bottom-4 right-8 z-50">
				{scrollTop && (
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className=" text-white p-2 rounded-full shadow-lg hover:bg-grey-700 focus:outline-none"
					>
						<CircleArrowUp className="w-7 h-7" color="black" />
					</button>
				)}
			</div>
		</>
	);
}
