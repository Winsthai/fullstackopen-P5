import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../reducers/userReducer";

const Navbar = () => {
  const padding = {
    paddingRight: 5,
  };

  const navbarStyle = {
    backgroundColor: "#d3d3d3",
    padding: 5,
    borderRadius: "3px",
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const logOut = () => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(setUser(null));
  };

  return (
    <div style={navbarStyle}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user.name} logged in &nbsp;
      <button onClick={logOut}>logout</button>
    </div>
  );
};

export default Navbar;
