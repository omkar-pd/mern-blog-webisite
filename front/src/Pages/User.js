import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../Components/Post";
export const User = () => {
  const { username } = useParams();
  const [Posts, SetPosts] = useState("");
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/posts/?user=${username}`)
      .catch((err) => {
        console.log(err);
      });
    SetPosts(res.data);
};
console.log("asd");
console.table(Posts);
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {Posts && Posts.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <Post
                      id={item._id}
                      title={item.title}
                      username={item.username}
                      description={item.description}
                      updated={item.updatedAt}
                    ></Post>
                  </Fragment>
                );
              })}
        </div>
      </div>
    </>
  );
};
