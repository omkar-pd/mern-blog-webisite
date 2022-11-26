import { useContext, useState } from "react";
// import "./write.css";
import axios from "axios";
import { Context } from "../Context/Context";

export function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://localhost:4000/api/posts", newPost);
      window.location.replace("post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full m-2 mx-auto p-2 md:w-7/12 h-screen ">
      <div className="w-full ">
        {file && (
          <img
            className=""
            src={URL.createObjectURL(file)}
            alt="Image Preview"
          />
        )}
      </div>
      <form
        className="p-2 m-2 h-full flex flex-col justify-evenly  "
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Description
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Story ..."
            onChange={(e) => setDescription(e.target.value)}
            defaultValue="Add Description
            "
          ></textarea>
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            htmlFor="file_input"
          >
            Upload Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="mx-auto">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Button
          </button>
        </div>

        {/* <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form> */}
      </form>
    </div>
  );
}
