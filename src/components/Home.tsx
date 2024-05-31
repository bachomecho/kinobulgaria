import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Header from "./Header";
import Filter from "./Filter";

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [search, setSearch] = useState<string>("");
	const [filter, setFilter] = useState<FilterProps>({
		yearRange: "",
		genre: "",
		duration: 0,
	});
	const [filterMethod, setFilterMethod] = useState<"search" | "filter">(
		"search"
	);

	useEffect(() => {
		fetch("/api/movies")
			.then((res) => {
				if (!res.ok)
					throw new Error(`Api did not respond. Status code: ${res.status}`);
				return res.json();
			})
			.then((data) => {
				setMovies(data.data);
			})
			.catch(
				(error) =>
					`Following error occurred while fetching movie data: ${error}`
			);
	}, []);

	function filterWithSearch(movieState: Movie[]) {
		if (search === "") {
			return movieState;
		} else {
			return movieState.filter((item) =>
				item.title.toLowerCase().includes(search.toLowerCase())
			);
		}
	}
	function filterWithFilter(movieState: Movie[]) {
		if (filter.yearRange === "") {
			return movieState;
		} else {
			const bounds = filter.yearRange.split("-").map(Number);
			return movieState.filter(
				(item) =>
					item.release_year >= bounds[0] && item.release_year <= bounds[1]
			);
		}
	}

	useEffect(() => {
		setFilterMethod("search");
	}, [search]);

	useEffect(() => {
		setFilterMethod("filter");
	}, [filter.yearRange]);

	let filteredMovies: Movie[] = [];
	if (filterMethod === "search" && filter.yearRange === "") {
		filteredMovies = filterWithSearch(movies);
	}
	if (filterMethod === "search" && filter.yearRange !== "") {
		filteredMovies = filterWithSearch(filterWithFilter(movies));
	}
	if (filterMethod === "filter" && search === "") {
		filteredMovies = filterWithFilter(movies);
	}
	if (filterMethod === "filter" && search !== "") {
		filteredMovies = filterWithFilter(filterWithSearch(movies));
	}

	return (
		<>
			<Header setSearchQuery={setSearch} />
			<Filter filterState={filter} setFilterQuery={setFilter} />
			{filteredMovies.length > 0 ? (
				<>
					<main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{filteredMovies.map((item, index) => (
								<MovieItem key={index} {...item} />
							))}
						</div>
					</main>
				</>
			) : (
				<p className="flex items-center justify-center">Няма намерени филми</p>
			)}
		</>
	);
}
