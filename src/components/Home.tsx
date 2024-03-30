import React, { useEffect, useState, useRef } from "react";
import MovieItem from "./MovieItem";
import Search from "./Search";
import Navigation from "./Navigation";
import Modal from "./Modal";

interface Movie {
  title: string;
  thumbnail_name: string;
  video_id: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const thumbnailName = useRef("");

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
      <header>
        <Navigation />
        <Search handleSearch={handleSearch} filterValue={search} />
      </header>
      <div className="intro">
        {filteredMovies && (
          <p className={"instruction"}>
            Кликнете върху една от иконките за да изберете вашия филм
          </p>
        )}
        <div className="modal-sector">
          <Modal
            imagePath={"/images/" + thumbnailName.current + ".jpg"}
            isActive={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
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
                      thumbnailName.current = item.thumbnail_name;
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
