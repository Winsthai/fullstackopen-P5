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

      <form onSubmit={createBlogs}>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Type title here"
        />
        <br />
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Type author here"
        />
        <br />
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Type url here"
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
