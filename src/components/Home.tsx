import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Search from "./Search";
import Navigation from "./Navigation";
import Modal from "./Modal";
import { movieInfoSpacing } from "../utils/utils";

export default function Home() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [selectedMovie, setSelectedMovie] = useState<Movie>({
		title: "",
		thumbnail_name: "",
		video_id: "",
		duration: 0,
		releaseYear: 0,
		director: "",
	});
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

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
			<header>
				<Navigation />
				<Search handleSearch={handleSearch} filterValue={search} />
			</header>
			<div className="intro">
				<div className="modal-sector">
					<Modal
						{...selectedMovie}
						isActive={showModal}
						onClose={() => setShowModal(false)}
					/>
				</div>
				{filteredMovies && (
					<p className={"instruction"}>
						Кликнете върху една от иконките за да изберете вашия филм
					</p>
				)}
				<div className={"image_gallery"}>
					<div className={"image_thumbs"}>
						<li>
							{filteredMovies.length !== 0 ? (
								filteredMovies.map((item, index) => (
									<MovieItem
										key={index}
										{...item}
										openModal={() => {
											setShowModal(true);
											setSelectedMovie(item);
										}}
									/>
								))
							) : (
								<p className={"no-movies-found"}>Няма намерени филми</p>
							)}
						</li>
					</div>
				</div>
			</div>
		</>
	);
}
