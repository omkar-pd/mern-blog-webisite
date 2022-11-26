import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import { Context } from "../Context/Context";

export const Post = (props) => {
  const { user, dispatch } = useContext(Context);

  let date = new Date(props.updated);
  let created =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  const image = props.photo
    ? `http://localhost:4000/images/${props.photo}`
    : "https://picsum.photos/600/400/?random";

    const userProfile = user?.username === props?.username ? `http://localhost:4000/images/${user?.profilePicture}` : "https://picsum.photos/32/32/?random"
    
  return (
    <div className=" my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 card">
      <article className="overflow-hidden rounded-lg shadow-lg h-full">
        <a className="max-h-20">
          <img
            alt="Placeholder"
            className="w-full object-cover article-img "
            src={image}
          />
        </a>
        <div>
          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg">
              <Link
                className="no-underline hover:underline text-black"
                to={`post/${props.id}`}
              >
                {props.title}
              </Link>
            </h1>
            <p className="text-grey-darker text-sm">{created}</p>
          </header>
          <div className="p-3">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {`${props.description.substr(0, 100)}...`}
            </p>
            <Link
              to={`post/${props.id}`}
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <Link
              className="flex items-center no-underline hover:underline text-black"
              to={props.username}
            >
              <img
                alt="Placeholder"
                className="block rounded-full w-10 h-10"
                src={userProfile}
              />
              <p className="ml-2 text-sm">{props.username}</p>
            </Link>
            <a className="no-underline text-grey-darker hover:text-red-dark">
              <span className="hidden">Like</span>
              <i className="fa fa-heart"></i>
            </a>
          </footer>
        </div>
      </article>
    </div>
  );
};
