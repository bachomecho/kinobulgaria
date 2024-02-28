import React, { useEffect, useState } from "react";
import MovieItem from "./components/MovieItem";
import Search from "./components/Search";

// TODO: style search bar in dark mode (defaults to normal blue in dark mode)
// TODO: close button for iFrame (maybe a modal instead of an iframe?)
// TODO: handle unavailable videos

interface Movie {
  title: string
  thumbnail_name: string
  video_id: string
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
      const response = await fetch("http://localhost:3000/api/movies");
      const res = await response.json();
      setMovies(res.data);
    }

  useEffect( () => {
    getPageData();
  }, []);

  function showHideIframe(id: string) {
    setMoviesrc(true);
    setMovieId(id);
    return 1
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
          <h2>Kino Bulgaria</h2>
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
                  <iframe // TODO: separate iframe out into its own component
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
            </div>
          </div>
        </div>
      </>
  );
}
