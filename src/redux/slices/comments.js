// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from '../../axios'

// export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
//     const { data } = await axios.get(`/comments`);
//     return data;
// });

// export const fetchRemoveComment = createAsyncThunk('comments/fetchRemoveComment', async (id) => {
//     axios.delete(`/comments/${id}`)
// })

// const initialState = {
//     comments: {
//         items: [],
//         status: 'loading',
//     },
// }

// const commentsSlice = createSlice({
//     name: 'comments',
//     initialState,
//     reducer: {},
//     extraReducers: {
//         // Получение коментариев
//         [fetchComments.pending]: (state) => {
//             state.comments.items = []
//             state.comments.status = 'loading'
//         },
//         [fetchComments.fulfilled]: (state, action) => {
//             state.comments.items = action.payload
//             state.comments.status = 'loaded'
//         },
//         [fetchComments.rejected]: (state) => {
//             state.comments.items = []
//             state.comments.status = 'error'
//         },

//         // Удаление коментариев
//         [fetchRemoveComment.pending]: (state, action) => {
//             state.comments.items = state.comments.items.filter(obj => obj._id !== action.meta.arg)
//         },
//     }
// })

// export const commentsReducer = commentsSlice.reducer