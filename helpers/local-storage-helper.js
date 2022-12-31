export const getHasVoted = (page) => {
    const val = localStorage.getItem(page);
    console.log(val);

    return Boolean(val);
}

export const setHasVoted = (page) => {
    localStorage.setItem(page, "true");
}
