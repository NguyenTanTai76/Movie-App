import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import useFetch from "@hooks/useFetch";

const FeatureMovies = () => {
  const [activeMovieId, setActiveMovieId] = useState();

  const { data: popularMoviesResponse } = useFetch({
    url: "/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true",
  });

  const { data: videoResponse } = useFetch(
    {
      url: `/movie/${activeMovieId}/videos`,
    },
    { enabled: !!activeMovieId },
  );

  const temp = (videoResponse?.results || []).find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  )?.key;

  const movies = (popularMoviesResponse.results || []).slice(0, 4);

  // Set active movie ID khi lần đầu render
  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0].id);
    }
  }, [JSON.stringify(movies)]);

  // Tự động chuyển phim mỗi 4 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveMovieId((prevId) => {
        const currentIndex = movies.findIndex((movie) => movie.id === prevId);
        const nextIndex = (currentIndex + 1) % movies.length;
        return movies[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, [movies]);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie key={movie.id} data={movie} trailerVideoKey={temp} />
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
