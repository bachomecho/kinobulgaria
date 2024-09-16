import { useEffect, useState, useRef, useContext } from "react";
import MovieItem from "./MovieItem";
import Header from "./Header";
import Filter from "./Filter";
import Modal from "./Modal";
import { pathContext } from "../App";

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
	const filePathPrefix = useContext(pathContext);
	const arrowUpIconPath = filePathPrefix + "/icons/scroll_top.svg";

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

	const initialMovies = useRef<Movie[]>([]);
	const genres = useRef<string[]>([]);
	genres.current = generateGenreList(initialMovies.current);

	useEffect(() => {
		fetch("/api/movies")
			.then((res) => {
				if (!res.ok)
					throw new Error(`Api did not respond. Status code: ${res.status}`);
				return res.json();
			})
			.then((data) => {
				const availableMovies = data.data.filter(
					(movie: Movie) => movie.video_id !== null
				);
				initialMovies.current = availableMovies;
				setMovies(availableMovies);
			})
			.catch(
				(error) =>
					`Following error occurred while fetching movie data: ${error}`
			);
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

	const escFunction = useCallback((event: any) => {
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
			<Header setSearchQuery={setSearch} />
			<Filter
				filterState={filter}
				setFilterQuery={setFilter}
				setRemoveFilters={setRemoveFilters}
				genreList={genres.current}
			/>
			{modalOpen && selectedMovie && (
				<Modal
					{...selectedMovie}
					modalOpenClosedMethod={() => setModalOpen(false)}
				/>
			)}
			{movies.length > 0 ? (
				<>
					<main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
						<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{movies.map((item, index) => (
								<li>
									<MovieItem
										key={index}
										{...item}
										modalOpenClosedMethod={() => {
											setSelectedMovie(item);
											setModalOpen(true);
										}}
									/>
								</li>
							))}
						</ul>
					</main>
				</>
			) : (
				<p className="flex items-center justify-center">Няма намерени филми</p>
			)}
			<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
				{scrollTop && (
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className=" text-white p-2 rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
					>
						<img
							src={arrowUpIconPath}
							alt="Scroll to top"
							className="w-7 h-7"
						/>
					</button>
				)}
			</div>
		</>
	);
}
