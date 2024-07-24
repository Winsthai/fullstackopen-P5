import { useEffect, useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th style={{ fontWeight: "normal" }}>
                {" "}
                <Link to={`/users/${user.id}`}>{user.name}</Link>{" "}
              </th>
              <th style={{ fontWeight: "normal" }}> {user.blogs.length} </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
