import { useState } from "react";
import ActorInfo from "./ActorInfo";

const ActorList = ({ actors = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  // Dữ liệu diễn viên hiển thị sẽ thay đổi tùy theo trạng thái isShowMore
  const currentActors = isShowMore ? actors.slice(0, 32) : actors.slice(0, 4);

  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Actors</p>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {/* Duyệt qua danh sách diễn viên và hiển thị thông tin của từng diễn viên */}
        {currentActors.map((actor) => (
          <ActorInfo
            key={actor.id}
            id={actor.id}
            name={actor.name}
            character={actor.character}
            profilePath={actor.profile_path}
            episodeCount={actor.episodeCount}
          />
        ))}
      </div>
      <p
        className="mt-1 cursor-pointer"
        onClick={() => setIsShowMore(!isShowMore)} // Chuyển đổi trạng thái khi click vào "Show More/Show Less"
      >
        {isShowMore ? "Show Less" : "Show More"}{" "}
        {/* Nội dung thay đổi khi click */}
      </p>
    </div>
  );
};

export default ActorList;
