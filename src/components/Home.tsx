import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Search from "./Search";
import Navigation from "./Navigation";

// TODO: close button for iFrame (maybe a modal instead of an iframe?)

interface Movie {
  title: string;
  thumbnail_name: string;
  video_id: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie_id, setMovieId] = useState<string>("");
  const [moviesrc, setMoviesrc] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  async function getPageData() {
    const response = await fetch("/api/movies");
    const res = await response.json();
    setMovies(res.data);
  }

  useEffect(() => {
    getPageData();
  }, []);

  function showHideIframe(id: string) {
    if (moviesrc) {
      if (id === movie_id) setMoviesrc(false);
      else setMovieId(id);
    } else {
      setMoviesrc(true);
      setMovieId(id);
    }
  }

  function filteredMovies(): Movie[] {
    if (search === "") {
      return movies;
    } else {
      return movies.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  const filteredMoviesVariable = filteredMovies();
  return (
    <>
      <header>
        <Navigation />
        <Search handleSearch={handleSearch} filterValue={search} />
      </header>
      <div className="intro">
        {filteredMoviesVariable && !moviesrc && (
          <p id="instruction">
            Кликнете върху една от иконките за да изберете вашия филм
          </p>
        )}
        <div className={"image_gallery"}>
          <div id="iframe-container">
            {moviesrc && (
              <iframe
                id="current-image"
                src={"https://www.youtube.com/embed/" + movie_id + "?rel=0"}
                width="700"
                height="400"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div className={"image_thumbs"}>
            <li>
              {filteredMoviesVariable ? (
                filteredMoviesVariable.map((item, index) => (
                  <MovieItem
                    key={index}
                    {...item}
                    onClick={() => showHideIframe(item.video_id)}
                  />
                ))
              ) : (
                <p>Няма намерени филми</p>
              )}
            </li>
          </div>
        </div>
      </div>
    </>
  );
}
