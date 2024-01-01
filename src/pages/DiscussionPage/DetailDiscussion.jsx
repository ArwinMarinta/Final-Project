import { useDispatch, useSelector } from "react-redux";
import chat from "../../assets/chating.svg";
import user from "../../assets/user.svg";
import book from "../../assets/book.svg";
import galery from "../../assets/galery.svg";
import { useEffect, useState } from "react";
import {
  addComment,
  getDetailDiscussion,
} from "../../redux/actions/CourseActions";
import { useParams } from "react-router-dom";
export default function DetailDiscussion() {
  const { getData } = useSelector((state) => state.course);
  const { detailDiscussion } = useSelector((state) => state.course);
  const { comentar } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { discussionId } = useParams();
  const [image, setImage] = useState(null);
  const [jawaban, setJawaban] = useState("");
  const [save, setSave] = useState(false);

  const handleSave = () => {
    setSave(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Validasi atau manipulasi gambar sesuai kebutuhan

    // Set file gambar
    setImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (id) {
      dispatch(getDetailDiscussion(id, discussionId));
    }
    if (save == true) {
      dispatch(addComment(jawaban, image, id, discussionId));
      // setSave(false);
      console.log(jawaban, comentar, id, discussionId, image);
    }
  }, [dispatch, jawaban, comentar, image]);
  return (
    <div>
      <div className="justify-center flex bg-gradient-to-r from-cyan-200 to-blue-500 drop-shadow-lg">
        <div className="container m-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-5">
              <img className="w-20 fill-white" src={chat} alt="" />
              <div>
                <div className="text-gray-800 text-2xl font-bold">
                  {getData.courseDiscussionName}
                </div>

                <h3 className="text-gray-800 text-xl font-semibold">
                  Selamat Datang Di Forum Diskusi Kelas
                </h3>
                <p className="text-gray-600">Konsultasi seputar materi anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center m-3">
          <div className="container">
            <div className="flex justify-between">
              <div className="flex flex-row items-center gap-3">
                <img
                  src={user}
                  className="w-10 rounded-full bg-blue-200"
                  alt=""
                />
                <h3 className="font-semibold text-xl">Khrisna Hermawan</h3>
                <p className="font-gray-100 text-xs">
                  {new Date(detailDiscussion.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs p-1 text-green-600 rounded-lg border-green-500 border-2 bg-green-200">
                  Selesai
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-xl mt-3">
                {detailDiscussion.title}
              </p>
              <p className="font-sm text-current text-xl mt-2">
                {detailDiscussion.question}
              </p>
              <img
                src={detailDiscussion.urlPhoto}
                className="flex self center max-w-[75%]"
                alt=""
              />
            </div>
            <div className="flex flex-wrap mt-6 gap-5">
              <div className="flex flex-row gap-2 items-center">
                <img className="w-5" src={chat} alt="" />
                <p className="text-gray-500">Pembahasan</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <img className="w-5" src={book} alt="" />
                <p className="text-gray-500">Tentang</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 border-b-2 border-gray-200"></div>
      <div className="flex justify-center">
        <div className="container">
          <div className="flex flex-row items-center gap-3">
            <img src={user} className="w-10 rounded-full bg-blue-200" alt="" />
            <h3 className="font-semibold text-xl">Nama Akun</h3>
          </div>
          <div>
            <form
              action=""
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            >
              <label htmlFor="imageInput" className="cursor-pointer ">
                <img src={galery} className="w-8" alt="Select from Gallery" />
                <input
                  type="file"
                  accept="image/*"
                  id="imageInput"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {image && (
                <div className="mb-4">
                  <img
                    src={image}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
              <input
                type="text"
                id=""
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                placeholder="Type Something"
                value={jawaban}
                onChange={(e) => setJawaban(e.target.value)}
              />
              <div className="flex items-center justify-between mt-2">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSave}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="my-5 border-b-2 border-gray-200"></div>
      <div className="flex justify-center">
        <div className="container">
          <div className="mb-5">
            <div className="flex flex-col gap-3">
              {comentar.map((item) => (
                <div key={item.commentarId}>
                  <div className="border-2 p-5 rounded-lg">
                    <div className="flex justify-between">
                      <div className="flex flex-row items-center gap-3">
                        <img
                          className="w-8 rounded-full bg-blue-200"
                          src={item.userPhoto}
                          alt=""
                        />
                        <h3 className="font-semibold text-lg">
                          {item.username}
                        </h3>
                        <p className="font-gray-100 text-xs">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-sm text-current">{item.commentar}</p>
                      <img src={item.urlPhoto} className="max-w-[40%]" alt="" />
                    </div>
                    <div className="flex flex-wrap mt-6 gap-5">{/*  */}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
