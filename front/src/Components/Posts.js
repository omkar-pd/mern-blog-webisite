import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Post } from "./Post";
export const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const res = await axios
      .get("http://localhost:4000/api/posts")
      .catch((err) => {
        console.log(err);
      });
    setPosts(res.data);
  };
  return (
    <>
<div className="container my-12 mx-auto px-4 md:px-12">
    <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {posts.map((item, index) => {
            return (
              <Fragment key={index}>
                <Post
                  id={item._id}
                  title={item.title}
                  username={item.username}
                  description={item.description}
                  updated={item.updatedAt}
                  photo = {item.photo}
                ></Post>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};
