import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="text-text-primary flex justify-center items-center bg-bg-secondary w-1/4 border-2">
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="p-2 size-fit hover:text-text-emphasize"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="">
        {props.children}
        <button
          onClick={toggleVisibility}
          className="hover:text-text-emphasize"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
