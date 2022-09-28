const store = require("./app/store");

const { fetchPost } = require("./features/post/postSlice");


// subscribe to state changes
store.subscribe(() => {
    // console.log(store.getState());
});

// disptach actions
const randomNumber = Math.floor(Math.random() * 10) + 1;
store.dispatch(fetchPost(randomNumber));
