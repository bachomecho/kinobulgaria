import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Header from "./Header";

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [search, setSearch] = useState<string>("");
	const [selectedMovie, setSelectedMovie] = useState<Movie>({
		title: "",
		thumbnail_name: "",
		video_id: "",
		duration: 0,
		release_year: 0,
		director: "",
	});
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}; // TODO: adjust search functions with new Header component

	async function getPageData() {
		const response = await fetch("/api/movies");
		const res = await response.json(); //TODO: sanitize response
		console.log(res.data);
		setMovies(res.data);
	}

	useEffect(() => {
		getPageData();
	}, []);
	useEffect(() => console.log(selectedMovie), [selectedMovie]); // TODO: remove this

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
			<Header />
			<main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredMovies.length > 0 ? (
						filteredMovies.map((item, index) => (
							<MovieItem key={index} {...item} />
						))
					) : (
						// TODO: check below styling
						<p className="inline-flex items-center justify-center">
							Няма намерени филми
						</p>
					)}
				</div>
			</main>
		</>
	);
}
