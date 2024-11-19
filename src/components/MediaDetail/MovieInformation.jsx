import { currencyFormatter } from "@libs/utils";

const MovieInformation = ({ movieInfo = {} }) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Information</p>

      {/* Thông tin tên gốc của phim */}
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{movieInfo.original_title}</p>
      </div>

      {/* Hiển thị quốc gia gốc của phim */}
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        {(movieInfo.origin_country || []).map((countryCode) => (
          <img
            key={countryCode}
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`} // Lấy hình ảnh cờ quốc gia từ CDN dựa trên mã quốc gia
            className="mr-1 mt-1 w-[1.4vw]"
            alt={`Flag of ${countryCode}`}
          />
        ))}
      </div>

      {/* Thông tin trạng thái của phim */}
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{movieInfo.status}</p>
      </div>

      {/* Hiển thị ngân sách của phim, đã được định dạng tiền tệ */}
      <div className="mb-4">
        <p className="font-bold">Budget</p>
        <p>
          {currencyFormatter(movieInfo.budget)}{" "}
          {/* Định dạng ngân sách bằng hàm currencyFormatter */}
        </p>
      </div>

      {/* Hiển thị doanh thu của phim, đã được định dạng tiền tệ */}
      <div className="mb-4">
        <p className="font-bold">Revenue</p>
        <p>
          {currencyFormatter(movieInfo.revenue)}{" "}
          {/* Định dạng doanh thu bằng hàm currencyFormatter */}
        </p>
      </div>
    </div>
  );
};

export default MovieInformation;
