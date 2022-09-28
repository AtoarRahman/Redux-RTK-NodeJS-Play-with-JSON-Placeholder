const fetch = require("node-fetch");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { fetchRelatedPosts } = require("../relatedPost/relatedPostSlice");

// initial state
const initialState = {
    loading: false,
    posts: [],
    error: "",
};

// create async thunk
const fetchPost = createAsyncThunk("post/fetchPost", async (postId, { dispatch }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await response.json();

    const keywords = post.title.split(' ');

    let queryString = "";

    if (keywords?.length > 0) {
        queryString += keywords.map((keyword) => `title_like=${keyword}`).join("&");
    }


    dispatch(fetchRelatedPosts(queryString));

    return post;
});

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.posts = action.payload;
        });

        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.posts = [];
        });
    },
});

module.exports = postSlice.reducer;
module.exports.fetchPost = fetchPost;
