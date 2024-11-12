import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";

const FeatureMovies = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();

  useEffect(() => {
    // Lấy danh sách phim phổ biến
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTVlMGYwYjQ1ZjM5MjQ4YjBkYWU0NDExMmY1ZWIxNiIsIm5iZiI6MTcyOTM2OTk1MC4xOTAxMjYsInN1YiI6IjY3MTNjZTFhMmJiYmE2NWY3YjEwZDY1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eE5HCYSo-l3T3W7khOAdXQaE6VL5RnnCqN5U-pfZQsg",
      },
    }).then(async (res) => {
      const data = await res.json();
      console.log({ data });
      const popularMovies = data.results.slice(0, 4);
      setMovies(popularMovies);
      setActiveMovieId(popularMovies[0].id);
    });
  }, []);

  // Tự động chuyển đổi phim mỗi 4 giây
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setActiveMovieId((prevId) => {
  //       const currentIndex = movies.findIndex((movie) => movie.id === prevId);
  //       const nextIndex = (currentIndex + 1) % movies.length; // Quay vòng lại đầu danh sách
  //       return movies[nextIndex].id;
  //     });
  //   }, 4000);

  //   return () => clearInterval(intervalId);
  // }, [movies]);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}

      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovies;
