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

    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },

    likeBlog(state, action) {
      const id = action.payload.id;
      const blogToUpdate = state.find((blog) => blog.id === id);
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
  },
});

export const { setBlogs, addBlog, removeBlog, likeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
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

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.deleteBlog(blog.id);
      dispatch(removeBlog(blog));

      // Set notification to show up for 5 seconds when a blog is deleted
      dispatch(
        setNotification(`${blog.title} by ${blog.author} deleted`, "green", 5)
      );
    } catch (exception) {
      // Deleting blog was unsuccessful
      dispatch(
        setNotification(
          "You can only delete a blog if you are the user who created it",
          "red",
          5
        )
      );
    }
  };
};

export const incrementLike = (blog) => {
  return async (dispatch) => {
    const newBlogData = {
      user: blog.user[0].id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    await blogsService.updateBlog(blog.id, newBlogData);

    dispatch(likeBlog(blog));
  };
};

export default blogSlice.reducer;
