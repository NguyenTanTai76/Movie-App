import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import các hook React Router
import MovieCard from "@components/MovieCard";
import useFetch from "@hooks/useFetch";

const MediaList = ({ title, tabs }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id); 

 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("activeTab"); // Lấy giá trị của activeTab từ URL
    if (tabFromUrl && tabs.find((tab) => tab.id === tabFromUrl)) {
      setActiveTabId(tabFromUrl); // Cập nhật tab đang hoạt động nếu hợp lệ
    }
  }, [location, tabs]); // Theo dõi sự thay đổi của URL hoặc danh sách tabs

  // Xác định URL dữ liệu cần fetch dựa trên activeTabId
  const url = tabs.find((tab) => tab.id === activeTabId)?.url;
  const { data } = useFetch({ url }); 

  // Lấy danh sách media, giới hạn 12 phần tử để hiển thị
  const mediaList = (data.results || []).slice(0, 12);

  // Hàm xử lý khi người dùng chuyển tab
  const handleTabChange = (tabId) => {
    setActiveTabId(tabId); // Cập nhật tab đang hoạt động
    navigate({
      pathname: location.pathname,
      search: `?activeTab=${tabId}`, // Cập nhật query parameter trong URL
    });
  };

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      {/* Tiêu đề và các tab */}
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${tab.id === activeTabId ? "bg-white text-black" : ""}`}
              onClick={() => handleTabChange(tab.id)} // Chọn tab mới và cập nhật URL
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Danh sách media */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id} 
            id={media.id}
            title={media.title || media.name} 
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path} 
            point={media.vote_average}
            mediaType={media.media_type || activeTabId} 
          />
        ))}
      </div>
    </div>
  );
};

export default MediaList;
