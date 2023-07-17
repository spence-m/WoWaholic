export const fetchHelpful = async (page) => {
  try {
    const { votes } = await (
      await fetch(`/.netlify/functions/get-helpful-votes?page=${page}`)
    ).json();
    return votes;
  } catch (e) {
    return -1;
  }
};

export const addHelpfulVote = async () => {
  try {
    const { votes } = await (
      await fetch(`/.netlify/functions/add-helpful-vote?page=${page}`)
    ).json();
    return votes;
  } catch (e) {
    return 1;
  }
};
