import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Header from "./Header";
import Filter from "./Filter";

// arrow to scroll to top of page
// lazy load images that are out of viewport
// don't render header and filter menus on every rerender

const filterWithSearch: TSearchMethod = (movieState, searchState) => {
	if (searchState === "") {
		return movieState;
	} else {
		return movieState.filter((item) =>
			item.title.toLowerCase().includes(searchState.toLowerCase())
		);
	}
};
const filterWithFilter: TFilterMethod = (movieState, filterState) => {
	if (filterState.yearRange === "") {
		return movieState;
	} else {
		const bounds = filterState.yearRange.split("-").map(Number);
		return movieState.filter(
			(item) => item.release_year >= bounds[0] && item.release_year <= bounds[1]
		);
	}
};

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [search, setSearch] = useState<string>("");
	const [filter, setFilter] = useState<FilterProps>({
		yearRange: "",
	});
	const [removeFilters, setRemoveFilters] = useState<boolean>(false);

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

	let listToFill: Movie[] = [];
	const allFilters = { search, ...filter };
	for (const [key, val] of Object.entries(allFilters)) {
		if (val !== "") {
			if (key === "search") {
				listToFill =
					listToFill.length > 0
						? filterWithSearch(listToFill, search)
						: filterWithSearch(movies, search);
			} else if (key === "yearRange") {
				listToFill =
					listToFill.length > 0
						? filterWithFilter(listToFill, filter)
						: filterWithFilter(movies, filter);
			}
		}
	}

	if (removeFilters) {
		setSearch("");
		setFilter({ yearRange: "" });
		setRemoveFilters(false);
	}

	const filteredMovies = listToFill.length > 0 ? listToFill : movies;

	return (
		<>
			<Header setSearchQuery={setSearch} />
			<Filter
				filterState={filter}
				setFilterQuery={setFilter}
				setRemoveFilters={setRemoveFilters}
			/>

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
