import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, incrementLike } from "../reducers/blogsReducer";

const Blog = () => {
  const [blog, setBlog] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const id = useParams().id;

  useEffect(() => {
    blogService.getBlog(id).then((blog) => {
      setBlog(blog);
    });
  }, []);

  if (!blog) {
    return null;
  }

  const updateLikes = () => {
    dispatch(incrementLike(blog));
    setBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const deleteButton = async () => {
    // Prompt confirmation window
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"?`)) {
      dispatch(deleteBlog(blog));
      navigate("/");
    }
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes: {blog.likes} <button onClick={updateLikes}>like</button> <br />
      </div>
      <div>added by {blog.author}</div>
      <button
        style={{
          display: user.username === blog.user[0].username ? "" : "none",
        }}
        onClick={deleteButton}
      >
        remove
      </button>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
