// Import các thư viện và component cần thiết
import { Link, useNavigate } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import Image from "./Image";

// Component MovieCard nhận các props: id, title, releaseDate, poster, point, mediaType
const MovieCard = ({ id, title, releaseDate, poster, point, mediaType }) => {
  const navigate = useNavigate();

  // Hàm xử lý điều hướng khi người dùng click vào card
  const handleNavigate = (id) => {
    navigate(mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`);
  };

  return (
    <Link
      to={mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`}
      className="rounded-lg border border-slate-800"
    >
      <div
        className="relative rounded-lg border-slate-800"
        onClick={() => handleNavigate(id)}
      >
        {/* Hiển thị nhãn 'TV Show' nếu mediaType là 'tv' */}
        {mediaType === "tv" && (
          <p className="absolute right-1 top-1 rounded bg-black p-1 text-sm font-bold text-white shadow-md">
            TV Show
          </p>
        )}

        {/* Hiển thị hình ảnh poster của phim/tv show */}
        <Image
          src={poster && `https://image.tmdb.org/t/p/w500${poster}`}
          className="w-full rounded-lg"
          width={210}
          height={300}
        />

        {/* Thông tin phim/tv show bao gồm thanh tiến trình và tên, ngày phát hành */}
        <div className="relative -top-[1.5vw] px-4">
          {/* Hiển thị thanh tiến trình dựa trên điểm */}
          <CircularProgressBar
            percent={Math.round(point * 10)} // Chuyển điểm thành tỷ lệ phần trăm (x10)
            strokeColor={point >= 7 ? "green" : point >= 5 ? "orange" : "red"}
          />
          <p className="mt-2 font-bold">{title}</p> {/* Tên phim */}
          <p className="text-slate-300">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
