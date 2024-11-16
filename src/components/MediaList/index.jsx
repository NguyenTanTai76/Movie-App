import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import các hook
import MovieCard from "@components/MovieCard";
import useFetch from "@hooks/useFetch";

const MediaList = ({ title, tabs }) => {
  const navigate = useNavigate(); // Để thay đổi URL
  const location = useLocation(); // Để lấy tham số query trong URL
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  // Đọc query parameter từ URL để thiết lập activeTabId
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("activeTab"); // Lấy activeTab từ URL
    if (tabFromUrl && tabs.find((tab) => tab.id === tabFromUrl)) {
      setActiveTabId(tabFromUrl);
    }
  }, [location, tabs]);

  // Tạo URL dựa trên activeTabId
  const url = tabs.find((tab) => tab.id === activeTabId)?.url;
  const { data } = useFetch({ url });

  const mediaList = (data.results || []).slice(0, 12);

  // Hàm thay đổi tab và cập nhật URL
  const handleTabChange = (tabId) => {
    setActiveTabId(tabId);
    // Cập nhật URL để giữ trạng thái tab khi quay lại
    navigate({
      pathname: location.pathname,
      search: `?activeTab=${tabId}`, // Thêm query parameter activeTab vào URL
    });
  };

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${tab.id === activeTabId ? "bg-white text-black" : ""}`}
              onClick={() => handleTabChange(tab.id)} // Chọn tab và thay đổi URL
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

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
