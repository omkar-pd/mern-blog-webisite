import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Context } from "../Context/Context";

export const DetailedPost = (props) => {
  const { id } = useParams();
  const { user } = useContext(Context);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const BASE_URL = "http://localhost:4000/api/";
  useEffect(() => {
    getPost(id);
  }, [id]);
  const getPost = async () => {
    const res = await axios.get(`${BASE_URL}posts/${id}`).catch((err) => {
      console.log(err);
    });
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.description);
  };
  const HandleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}posts/${id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  const HandleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}posts/${id}`, {
        username: user.username,
        title,
        description,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const image = post.photo
    ? `http://localhost:4000/images/${post.photo}`
    : "https://picsum.photos/600/400/?random";
  return (
    <div className="max-w-screen-xl mx-auto mb-4">
      <main className="mt-10">
        <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative">
          <img src={image} className="w-full" />
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="m-2 p-2 w-full text-4xl bg-red-50"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h2 className="text-4xl font-semibold  leading-tight p-4">
              {title}
            </h2>
          )}
          <div className="flex justify-between items-center">
            <div>
              <a className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                Nutrition
              </a>
              <div className="flex mt-3">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1663862424506-1a1ed0777761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjA3MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjU1ODA5MjU&ixlib=rb-1.2.1&q=80&w=400"
                    className="h-10 w-10 rounded-full mr-2 object-cover "
                  />
                  <p className="font-semibold text-gray-200 text-sm">
                    {" "}
                    {DetailedPost.username}{" "}
                  </p>
                  <p className="font-semibold text-gray-400 text-xs">
                    {" "}
                    {DetailedPost.createdAt}{" "}
                  </p>
                </div>
              </div>
            </div>
            {post.username === user?.username && (
              <div className="p-4 m-2">
                {!updateMode && (
                  <div className="flex">
                    <FaEdit
                      className="m-2 cursor-pointer"
                      onClick={() => setUpdateMode(true)}
                    />
                    <FaTrash
                      className="m-2 cursor-pointer"
                      onClick={HandleDelete}
                    />{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
          {updateMode ? (
            <textarea
              className="m-2 p-2 w-full bg-red-50"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="pb-6">{description}</p>
          )}
          {updateMode && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={HandleUpdate}
            >
              Update
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
