import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Header from "./Header";

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [search, setSearch] = useState<string>("");

	async function getPageData() {
		const response = await fetch("/api/movies");
		const res = await response.json();
		setMovies(res.data);
	}

	useEffect(() => {
		getPageData();
	}, []);

	function filterMovies(): Movie[] {
		if (search === "") {
			return movies;
		} else {
			return movies.filter((item) =>
				item.title.toLowerCase().includes(search.toLowerCase())
			);
		}
	}

	const filteredMovies = filterMovies();
	return (
		<>
			<Header setSearchQuery={setSearch} />
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
