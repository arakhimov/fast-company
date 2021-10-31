const comments = [
  {
    _id: "67rdca3eeb7f6fg",
    userId: "67rdca3eeb7f6fgeed471815",
    pageId: "67rdca3eeb7f6fgeed471815",
    content: "Lorem ipsum dolor",
    createdAt: "1633576399367"
  },
  {
    _id: "67rdca3eeb7f6fgdasd",
    pageId: "67rdca3eeb7f6fgeed471815",
    userId: "67rdca3eeb7f6fgeed471815",
    content: "Lorem ipsum dolor and etc",
    createdAt: "1633573058520"
  },
  {
    _id: "67rdca3eeb7f6fgdaasd",
    pageId: "67rdca3eeb7f6fgeed471817",
    userId: "67rdca3eeb7f6fgeed471815",
    content: "Lorem ipsum dolor and etc",
    createdAt: "1633573058520"
  }
];

// localStorage.clear();

if (!localStorage.comments) {
  localStorage.setItem("comments", JSON.stringify(comments));
}

const fetchAll = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(JSON.parse(localStorage.getItem("comments"))), 200)
  );

const fetchCommentsForUser = (userId) =>
  new Promise((resolve) =>
    setTimeout(() => {
      const comments = JSON.parse(localStorage.getItem("comments"));
      return resolve(
        comments
          .filter((comment) => comment.pageId === userId)
          .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      );
    }, 200)
  );

const add = (content, pageId, userId) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const comments = JSON.parse(localStorage.getItem("comments"));
      const newComment = {
        _id: (Math.random() + 1).toString(36).substr(2, 9),
        pageId: pageId,
        userId: userId,
        createdAt: Date.now().toString(),
        content: content
      };
      comments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(comments));
      resolve(newComment);
    }, 200)
  );
};

const remove = (id) => {
  const newComments = JSON.parse(localStorage.getItem("comments")).filter(
    (comment) => comment._id !== id
  );
  localStorage.setItem("comments", JSON.stringify(newComments));
};

export default {
  fetchAll,
  fetchCommentsForUser,
  add,
  remove
};
