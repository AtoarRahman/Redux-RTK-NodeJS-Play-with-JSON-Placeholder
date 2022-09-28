const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");


// initial state
const initialState = {
    loading: false,
    relatedPosts: [],
    error: "",
};

// create async thunk
const fetchRelatedPosts = createAsyncThunk("post/fetchRelatedPosts", async (queryString) => {

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/?${queryString}`);
    const posts = await response.json();

    return posts;
});

const relatedPostSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedPosts.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.relatedPosts = action.payload;
        });

        builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.relatedPosts = [];
        });
    },
});

module.exports = relatedPostSlice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;
