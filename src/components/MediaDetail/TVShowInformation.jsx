const TVShowInformation = ({ tvInfo = {} }) => {
  return (
    <div>
      {/* Tiêu đề của phần thông tin */}
      <p className="mb-4 text-[1.4vw] font-bold">Information</p>

      {/* Hiển thị tên gốc của chương trình TV */}
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{tvInfo.original_name}</p>
      </div>

      {/* Hiển thị quốc gia gốc với biểu tượng quốc kỳ */}
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        {(tvInfo.origin_country || []).map((countryCode) => (
          <img
            key={countryCode} // Mã quốc gia làm key duy nhất
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`} 
            className="mr-1 mt-1 w-[1.4vw]" 
            alt={countryCode}
          />
        ))}
      </div>

      {/* Hiển thị trạng thái của chương trình (đang phát, kết thúc, v.v.) */}
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{tvInfo.status}</p>
      </div>

      {/* Hiển thị danh sách các mạng lưới phát sóng với logo */}
      <div className="mb-4">
        <p className="font-bold">Network</p>
        {(tvInfo.networks || []).map((network) => (
          <img
            className="invert" // Invert màu để phù hợp với giao diện
            key={network.id} // ID mạng lưới làm key duy nhất
            src={`https://media.themoviedb.org/t/p/h30${network.logo_path}`} 
            alt={network.name} 
          />
        ))}
      </div>
    </div>
  );
};

export default TVShowInformation;
