import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Header from "./Header";
import Filter from "./Filter";

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [search, setSearch] = useState<string>("");
	const [filter, setFilter] = useState<FilterProps>({
		yearRange: "",
	}); // TODO: add remove all filters at once functionality

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

	const filterWithSearch: TFilterMethod = (movieState) => {
		if (search === "") {
			return movieState;
		} else {
			return movieState.filter((item) =>
				item.title.toLowerCase().includes(search.toLowerCase())
			);
		}
	};
	const filterWithFilter: TFilterMethod = (movieState) => {
		if (filter.yearRange === "") {
			return movieState;
		} else {
			const bounds = filter.yearRange.split("-").map(Number);
			return movieState.filter(
				(item) =>
					item.release_year >= bounds[0] && item.release_year <= bounds[1]
			);
		}
	};

	const filterFuncMap = new Map<string, (movieState: Movie[]) => Movie[]>([
		["search", filterWithSearch],
		["yearRange", filterWithFilter],
	]);

	const filterDriver = (): Movie[] => {
		let listToFill: Movie[] = [];
		const allFilters = { search, ...filter };
		for (const [key, val] of Object.entries(allFilters)) {
			if (val !== "") {
				const filterFunc = filterFuncMap.get(key);
				if (filterFunc) {
					if (listToFill.length > 0) {
						listToFill = filterFunc(listToFill);
					} else listToFill = filterFunc(movies);
				}
			}
		}
		return listToFill.length > 0 ? listToFill : movies;
	};

	const filteredMovies = filterDriver();

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
