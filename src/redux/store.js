import { configureStore } from '@reduxjs/toolkit'
// import { postsReducer } from './slices/posts'
// import { authReduser } from './slices/auth'
// import { commentsReducer } from './slices/comments'
import { authApi } from './query/authApi'
import { postsApi } from './query/postsApi'
import { commentsApi } from './query/commentsApi'

const store = configureStore({
    reducer: {
        // auth: authReduser,
        // posts: postsReducer,
        // comments: commentsReducer,

        [authApi.reducerPath]: authApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(postsApi.middleware)
            .concat(commentsApi.middleware),
})

export default store