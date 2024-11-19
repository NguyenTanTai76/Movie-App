// Import các thành phần cần thiết
import ImageComponent from "@components/Image";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import { GENDER_MAPPING } from "@libs/constants";
import { useLoaderData } from "react-router-dom";

// Trang hiển thị thông tin về người (People)
const PeoplePage = () => {
  const peopleInfo = useLoaderData();

  console.log(peopleInfo);

  return (
    // Thẻ div bao ngoài có nền đen và màu chữ trắng
    <div className="bg-black text-[1.2vw] text-white">
      <div className="container">
        <div className="flex-1">
          {/* Thành phần hiển thị hình ảnh của người */}
          <ImageComponent
            className="mb-6"
            width={600}
            height={900}
            src={
              peopleInfo.profile_path &&
              `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${peopleInfo.profile_path}`
            }
          />
          <div>
            {/* Tiêu đề Personal Info */}
            <p className="mb-6 text-[1.3vw] font-bold">Personal Info</p>
            <div className="space-y-4">
              {/* Hiển thị thông tin về người */}
              <div>
                <p className="font-bold">Known For</p>
                <p>{peopleInfo.known_for_department}</p>
              </div>

              <div>
                <p className="font-bold">Gender</p>
                {/* Hiển thị giới tính, sử dụng GENDER_MAPPING để lấy tên */}
                <p>{GENDER_MAPPING[peopleInfo.gender]}</p>
              </div>

              <div>
                <p className="font-bold">Place of Birth</p>
                <p>{peopleInfo.place_of_birth}</p>
              </div>

              <div>
                <p className="font-bold">Birthday</p>
                <p>{peopleInfo.birthday}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[2]">
          {/* Tiêu đề với tên người */}
          <p className="mb-6 text-[2vw] font-bold">{peopleInfo.name}</p>
          <div className="mb-6">
            {/* Tiêu đề Biography và nội dung tiểu sử */}
            <p className="mb-4 text-[1.4vw] font-bold">Biography</p>
            <p className="whitespace-pre-line">{peopleInfo.biography}</p>
          </div>
          <div>
            {/* Thành phần hiển thị các media mà người này đã tham gia */}
            <RelatedMediaList
              mediaList={peopleInfo.combined_credits?.cast || []} // Lấy danh sách phim/tv show mà người này tham gia
              title="Known For"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
