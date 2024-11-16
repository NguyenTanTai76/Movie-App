import { useState } from "react";
import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/Image";

const SeasonsList = ({ seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  // Hiển thị 3 seasons mặc định, hoặc toàn bộ nếu "Show More" được bật
  const visibleSeasons = isShowMore ? seasons : seasons.slice(0, 3);

  return (
    <div className="mt-8 text-[1.3vw]">
      <p className="mb-4 text-[1.4vw] font-bold">Seasons</p>
      <div className="space-y-4">
        {visibleSeasons.map((season) => (
          <div
            key={season.id}
            className="flex gap-4 rounded-lg border border-slate-200 p-3 shadow-md"
          >
            <ImageComponent
              className="w-1/4 rounded-lg"
              width={130}
              height={195}
              src={`https://media.themoviedb.org/t/p/w300${season.poster_path}`}
              alt={season.name}
            />

            <div className="space-y-1">
              <p className="text-[1.4vw] font-bold">{season.name}</p>
              <div className="flex items-center gap-2">
                <p className="font-bold">Rating</p>
                <CircularProgressBar
                  percent={Math.round(season.vote_average * 10)}
                  size={2.5}
                  strokeWidth={0.2}
                />
              </div>
              <p>
                <span className="font-bold">Release Date:</span>{" "}
                {season.air_date}
              </p>
              <p>
                {season.episode_count}{" "}
                {season.episode_count === 1 ? "Episode" : "Episodes"}
              </p>
              <p>{season.overview || "No overview available."}</p>
            </div>
          </div>
        ))}
      </div>
      {seasons.length > 3 && (
        <p
          className="mt-4 cursor-pointer text-blue-600 hover:underline"
          onClick={() => setIsShowMore(!isShowMore)}
        >
          {isShowMore ? "Show Less" : "Show More"}
        </p>
      )}
    </div>
  );
};

export default SeasonsList;
