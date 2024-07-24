import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <br />
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      <br />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;
