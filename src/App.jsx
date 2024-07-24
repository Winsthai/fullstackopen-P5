import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { getSortedBlogsByLikes } from "./services/selectors";
import { setUser } from "./reducers/userReducer";
import Users from "./components/Users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector(getSortedBlogsByLikes);

  // Effect hook to check if user is already logged in
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const user = useSelector((state) => {
    return state.user;
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    // Render error if HTTP POST request to login fails, else update the user token
    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", "red", 5));
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(setUser(null));
  };

  const updateBlog = async (blog, newBlogData) => {
    const updatedBlog = await blogService.updateBlog(blog.id, newBlogData);
    const newBlogs = blogs
      .map((oldBlog) => (oldBlog.id === blog.id ? updatedBlog : oldBlog))
      .sort((a, b) => b.likes - a.likes);
    setBlogs(newBlogs);
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
        <BlogForm />
      </Togglable>
      <br />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default App;
