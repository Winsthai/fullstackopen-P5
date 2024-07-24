import axios from "axios";
const baseUrl = "/api/users";

// Get all users
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Get single user
const getUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, getUser };
