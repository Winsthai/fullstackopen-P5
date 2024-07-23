import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },

    addBlog(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.createBlog(blog);
      dispatch(addBlog(newBlog));
      dispatch(
        setNotification(`${blog.title} by ${blog.author} added`, "green", 5)
      );
    } catch (exception) {
      dispatch(setNotification("Token or blog data is invalid", "red", 5));
    }
  };
};

export default blogSlice.reducer;
