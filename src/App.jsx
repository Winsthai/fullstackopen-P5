import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageColor, setMessageColor] = useState("red");

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  // Effect hook to check if user is already logged in
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Render error if HTTP POST request to login fails, else update the user token
    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", "red", 5));
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const addBlog = async (blogData) => {
    try {
      const newBlog = await blogService.createBlog(blogData);
      setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes));

      // Set notification to show up for 5 seconds when a new blog is added
      dispatch(
        setNotification(
          `${newBlog.title} by ${newBlog.author} added`,
          "green",
          5
        )
      );
    } catch (exception) {
      // Creating blog was unsuccessful
      dispatch(setNotification("Token or blog data is invalid", "red", 5));
    }
  };

  const updateBlog = async (blog, newBlogData) => {
    const updatedBlog = await blogService.updateBlog(blog.id, newBlogData);
    const newBlogs = blogs
      .map((oldBlog) => (oldBlog.id === blog.id ? updatedBlog : oldBlog))
      .sort((a, b) => b.likes - a.likes);
    setBlogs(newBlogs);
  };

  const deleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id);

      setBlogs(
        blogs
          .filter((oldBlog) => blog.id !== oldBlog.id)
          .sort((a, b) => b.likes - a.likes)
      );

      // Set notification to show up for 5 seconds when a blog is deleted
      dispatch(
        setNotification(`${blog.title} by ${blog.author} deleted`, "green", 5)
      );
    } catch (exception) {
      // Deleting blog was unsuccessful (should not be possible anyways)
      dispatch(
        setNotification(
          "You can only delete a blog if you are the user who created it",
          "red",
          5
        )
      );
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification></Notification>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              data-testid="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              data-testid="password"
            />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification></Notification>

      <div>
        {user.name} logged in
        <button onClick={logOut}>logout</button>
      </div>

      <Togglable buttonLabel="create new blog">
        <BlogForm updateBlogs={addBlog} />
      </Togglable>
      <br />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
