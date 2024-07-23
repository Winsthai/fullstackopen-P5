import { createSelector } from "reselect";

export const getSortedBlogsByLikes = createSelector(
  [(state) => state.blogs],
  (blogs) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  }
);
