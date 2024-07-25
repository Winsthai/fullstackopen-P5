import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <div className="flex justify-center items-center m-5 mb-10">
        <br />
        <Togglable buttonLabel="Create new blog">
          <BlogForm />
        </Togglable>
        <br />
      </div>

      {blogs.map((blog) => (
        <div
          style={blogStyle}
          key={blog.id}
          className="bg-bg-secondary p-5 m-5 rounded-sm "
        >
          <Link
            to={`/blogs/${blog.id}`}
            className="text-text-primary p-5 text-xl hover:text-text-emphasize font-sans font-semibold"
          >
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
