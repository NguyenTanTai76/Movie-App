import { useForm } from "react-hook-form"; 
import FormField from "./FormField";
import MediaTypeInput from "./FormInputs/MediaTypeInput";
import GenresInput from "./FormInputs/GenresInput";
import RatingInput from "./FormInputs/RatingInput";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({ setSearchFormValues }) => {
  const [searchParams] = useSearchParams(); // Lấy tham số query từ URL
  const mediaType = searchParams.get("mediaType"); // Lấy giá trị của tham số `mediaType` từ URL
  console.log(mediaType);

  // Quản lý form bằng `react-hook-form`
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      mediaType: ["tv", "movie"].includes(mediaType) ? mediaType : "movie", 
      genres: [], 
      rating: "All", 
    },
  });

  // Hàm xử lý khi người dùng submit form
  const onSubmit = (data) => {
    console.log({ formData: data }); 
  };

  // Theo dõi giá trị hiện tại của form
  const formValues = watch(); 
  console.log({ formValues });

  // Cập nhật giá trị form khi thay đổi
  useEffect(() => {
    setSearchFormValues(formValues); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues)]); 

  return (
    <div className="rounded-lg border p-4 shadow-md">
      {/* Form chứa các trường nhập liệu */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Trường chọn loại media */}
        <FormField
          name="mediaType"
          label="Media Type" 
          control={control}
          Component={MediaTypeInput}
        />

        {/* Trường chọn thể loại */}
        <FormField
          name="genres"
          label="Genres"
          control={control}
          Component={GenresInput}
        />

        {/* Trường chọn đánh giá */}
        <FormField
          name="rating"
          label="Rating"
          control={control}
          Component={RatingInput}
        />
      </form>
    </div>
  );
};

export default SearchForm;
