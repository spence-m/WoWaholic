export const fetchHelpful = async () => {
    try {
        const {votes} = await (await fetch("/.netlify/functions/get-helpful-votes")).json();
        return votes;
    } catch (e) {
        return 0;
    }
}

export const addHelpfulVote = async () => {
    try {
        const {votes} = await (await fetch("/.netlify/functions/add-helpful-vote")).json();
        return votes;
    } catch (e) {
        return 1;
    }
}
