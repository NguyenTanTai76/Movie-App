import { useEffect, useState } from "react";

// Định nghĩa các header mặc định cho yêu cầu fetch
const DEFAULT_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

export default function useFetch(
  { url = "", method = "GET", headers = {} }, // Tham số đầu vào: url, method, headers
  { enabled } = { enabled: true }, // Tham số cấu hình: enabled để kiểm tra có được phép thực hiện yêu cầu hay không
) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Hook useEffect để thực hiện gọi API khi các tham số thay đổi
  useEffect(() => {
    if (enabled) {
      setIsLoading(true);

      // Gọi API bằng fetch với url, method, và headers đã cấu hình
      fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
        method,
        headers: {
          ...DEFAULT_HEADERS, // Kết hợp header mặc định với header được truyền vào
          ...headers,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          console.log({ data });
          setData(data);
        })
        .catch((err) => {
          console.error(err); // Xử lý lỗi nếu có
        })
        .finally(() => {
          setIsLoading(false); // Kết thúc trạng thái loading
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers), enabled]); // Chạy lại effect nếu các tham số thay đổi

  // Trả về trạng thái loading và dữ liệu đã fetch
  return { isLoading, data };
}
