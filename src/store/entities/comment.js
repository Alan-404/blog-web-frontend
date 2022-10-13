import {createAsyncThunk, createSlice, combineReducers} from '@reduxjs/toolkit'
import axios from 'axios'
import { apiUrl, keyToken } from '../../common/consts'


// add comment
const initStateAddComment = {
    isLoadingAddComment: false,
    successAddComment: false,
}


export const addCommentAction = createAsyncThunk(
    "add",
    async (commentData) => {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(keyToken)}`,
                "Content-Type" :'application/json'
            }
        }

        const {data} = await axios.post(`${apiUrl}/comment/add`, commentData, config)
        return data
    }
)

export const addCommentSlice = createSlice({
    name: "add",
    initialState: initStateAddComment,
    extraReducers: (builder) => {
        builder.addCase(addCommentAction.pending, (state) => {
            state.isLoadingAddComment = true
        })
        builder.addCase(addCommentAction.fulfilled, (state, data) => {
            state.isLoadingAddComment = false
            state.successAddComment = data.payload.success
        })
        builder.addCase(addCommentAction.rejected, (state) => {
            state.isLoadingAddComment = false
            state.successAddComment = false
        })
    }
})

// get replies
const initStateGetReplies = {
    replies: []
}

export const getRepliesAction = createAsyncThunk(
    "replies",
    async (id) => {
        const {data} = await axios.get(`${apiUrl}/comment/reply/${id}`)

        return data
    }
)

export const getRepliesSlice = createSlice({
    name: "replies",
    initialState: initStateGetReplies,
    extraReducers: (builder) => {
        builder.addCase(getRepliesAction.fulfilled, (state, data) => {
            state.replies = data.payload
        })
    }
})

// get all comments
const initStateGetAllComments = {
    allComments: []
}

export const getAllCommentsAction = createAsyncThunk(
    "all",
    async (id) => {
        const {data} = await axios.get(`${apiUrl}/comment/all/${id}`)
        console.log(data)
        return data
    }
)

export const getAllCommentsSlice = createSlice({
    name: "all",
    initialState: initStateGetAllComments,
    extraReducers: (builder) => {
        builder.addCase(getRepliesAction.fulfilled, (state, data) => {
            state.allComments = data.payload
        })
    }
})


// reducer
const commentReducer = combineReducers({
    addComment: addCommentSlice.reducer,
    getReplies: getRepliesSlice.reducer,
    getAllComments: getAllCommentsSlice.reducer
})

export default commentReducer