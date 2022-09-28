const configureStore = require("@reduxjs/toolkit").configureStore;
const relatedPostReducer = require("../features/relatedPost/relatedPostSlice");
const postReducer = require("../features/post/postSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
        relatedPost: relatedPostReducer,
        post: postReducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(logger),
});

module.exports = store;
