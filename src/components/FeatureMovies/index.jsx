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

  console.log(videoResponse, temp);

  const movies = (popularMoviesResponse.results || []).slice(0, 4);

  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  // Tự động chuyển đổi phim mỗi 4 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveMovieId((prevId) => {
        const currentIndex = movies.findIndex((movie) => movie.id === prevId);
        const nextIndex = (currentIndex + 1) % movies.length; // Quay vòng lại đầu danh sách
        return movies[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, [movies]);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie
            key={movie.id}
            data={movie}
            trailerVideoKey={
              (videoResponse?.results || []).find(
                (video) => video.type === "Trailer" && video.site === "YouTube",
              )?.key
            }
          />
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
