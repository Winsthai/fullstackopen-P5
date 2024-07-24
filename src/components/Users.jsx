import { useEffect, useState } from "react";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((users) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <tr>
            <th style={{ fontWeight: "normal" }}> {user.name} </th>
            <th style={{ fontWeight: "normal" }}> {user.blogs.length} </th>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Users;
