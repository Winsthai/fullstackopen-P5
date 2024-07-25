import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const createBlogs = (event) => {
    event.preventDefault();

    const blogData = { title, author, url };

    dispatch(createBlog(blogData));

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new blog</h2>

      <form onSubmit={createBlogs} className="grid">
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Type title here"
          className="text-bg-primary ml-5 p-0.5"
        />
        <br />
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Type author here"
          className="text-bg-primary ml-5 p-0.5"
        />
        <br />
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Type url here"
          className="text-bg-primary ml-5 p-0.5"
        />
        <br />
        <button type="submit" className="hover:text-text-emphasize">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
