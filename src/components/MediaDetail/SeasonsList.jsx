import { useState } from "react";
import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/Image";

const SeasonsList = ({ seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false); // Trạng thái hiển thị thêm

  // Lấy danh sách mùa hiển thị dựa trên trạng thái
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
            {/* Ảnh poster của mùa */}
            <ImageComponent
              className="w-1/4 rounded-lg"
              width={130}
              height={195}
              src={
                season.poster_path &&
                `https://media.themoviedb.org/t/p/w300${season.poster_path}`
              }
              alt={season.name}
            />

            <div className="space-y-1">
              {/* Tên mùa */}
              <p className="text-[1.4vw] font-bold">{season.name}</p>

              {/* Xếp hạng mùa */}
              <div className="flex items-center gap-2">
                <p className="font-bold">Rating</p>
                <CircularProgressBar
                  percent={Math.round(season.vote_average * 10)}
                  size={2.5}
                  strokeWidth={0.2}
                />
              </div>

              {/* Ngày phát hành */}
              <p>
                <span className="font-bold">Release Date:</span>{" "}
                {season.air_date}
              </p>

              {/* Số tập của mùa */}
              <p>
                {season.episode_count}{" "}
                {season.episode_count === 1 ? "Episode" : "Episodes"}
              </p>

              {/* Tóm tắt nội dung mùa */}
              <p>{season.overview || "No overview available."}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Nút hiển thị thêm/thu gọn */}
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
