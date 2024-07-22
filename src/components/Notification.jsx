import { useSelector } from "react-redux";

const Notification = ({}) => {
  const { message, color } = useSelector((state) => {
    return state.notification;
  });

  if (message === null) {
    return null;
  }

  const borderColor = color;

  return (
    <div
      style={{
        background: "#DCDCDC",
        color: borderColor,
        margin: "10px 0px 10px 0px",
        borderColor: borderColor,
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <h2> {message} </h2>
    </div>
  );
};

export default Notification;
