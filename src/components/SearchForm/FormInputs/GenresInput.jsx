import useFetch from "@hooks/useFetch";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";

const GenresInput = ({ control, onChange, value = [] }) => {
  const mediaType = useWatch({ name: "mediaType", control });
  const { data, isLoading, isError } = useFetch(
    { url: `/genre/${mediaType}/list` },
    { enabled: !!mediaType },
  );

  useEffect(() => {
    onChange([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);

  // Kiểm tra nếu dữ liệu chưa tải xong hoặc có lỗi
  if (isLoading) return <p>Loading genres...</p>;
  if (isError) return <p>Error loading genres</p>;

  return (
    <div className="flex flex-wrap gap-1">
      {(data?.genres || []).map((genre) => (
        <p
          key={genre.id}
          onClick={() => {
            // Thêm genre.id vào hoặc xóa genre.id ra khỏi mảng value
            let newValue = [...value]; // Sao chép value là một mảng
            if (newValue.includes(genre.id)) {
              newValue = newValue.filter((g) => g !== genre.id); // Xóa genre.id khỏi mảng
            } else {
              newValue = [...newValue, genre.id]; // Thêm genre.id vào mảng
            }
            onChange(newValue); // Gọi onChange để cập nhật giá trị mới
          }}
          className={`cursor-pointer rounded-lg border px-2 py-1 ${
            value.includes(genre.id) ? "bg-black text-white" : ""
          }`}
        >
          {genre.name}
        </p>
      ))}
    </div>
  );
};

export default GenresInput;
