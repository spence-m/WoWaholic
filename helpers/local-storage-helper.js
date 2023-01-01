export const getHasVoted = (page) => {
  const val = localStorage.getItem(page);

  return Boolean(val);
};

export const setHasVoted = (page) => {
  localStorage.setItem(page, "true");
};
