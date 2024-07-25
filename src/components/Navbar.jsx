import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../reducers/userReducer";

const Navbar = () => {
  const padding = {
    paddingRight: 5,
  };

  const navbarStyle = {
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
    <div
      style={navbarStyle}
      className="text-text-nav font-bold flex justify-center items-center bg-bg-secondary w-1/3 border-2"
    >
      <Link to="/" style={padding} className="hover:text-text-emphasize mr-10">
        Blogs
      </Link>
      <Link
        to="/users"
        style={padding}
        className="hover:text-text-emphasize mr-10"
      >
        Users
      </Link>
      {user.name} logged in &nbsp;
      <button onClick={logOut} className="hover:text-text-emphasize ml-2 p-2">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
