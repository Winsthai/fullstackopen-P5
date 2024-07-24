import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";

const User = () => {
  const [user, setUser] = useState([]);

  const id = useParams().id;

  useEffect(() => {
    userService.getUser(id).then((user) => {
      setUser(user);
    });
  }, []);

  if (!user.blogs) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
