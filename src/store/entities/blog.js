import { createAsyncThunk, createSlice, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl, keyToken } from "../../common/consts";

// add blog
const initCreateBlog = {
    isLoadingCreateBlog: false, 
    successCreateBlog: false
}

export const createBlogAction = createAsyncThunk(
    "blog/create",
    async (blogData) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(keyToken)}`,
                "Content-Type" :'multipart/form-data'
            }
        }
        const {data} = await axios.post(`${apiUrl}/blog/add`, blogData, config)
        
        return data
    }
)

export const createBlogSlice = createSlice({
    name: 'create',
    initialState: initCreateBlog,
    extraReducers: (builder) => {
        builder.addCase(createBlogAction.pending, (state) => {
            state.isLoadingCreateBlog = true
        })
        builder.addCase(createBlogAction.fulfilled, (state, data) => {
            state.isLoadingCreateBlog = false
            state.successCreateBlog = true
        })
        builder.addCase(createBlogAction.rejected, (state)=> {
            state.isLoadingCreateBlog = false
            state.successCreateBlog = false
        })
    }
})


// get blogs
const initGetBlogs = {
    blogs: [],
    isLoadingGetBlogs: false
}

export const getBlogsAction = createAsyncThunk(
    "blog/view",
    async ({number, page}) => {
        const {data} = await axios.get(`${apiUrl}/blog/view?number=${number}&page=${page}`)
        console.log(data)
        return data
    }
)

export const getBlogsSlice = createSlice({
    name: "view",
    initialState: initGetBlogs,
    extraReducers: (builder) => {
        builder.addCase(getBlogsAction.pending, (state) => {
            state.isLoadingGetBlogs = true
        })
        builder.addCase(getBlogsAction.fulfilled, (state, data) => {
            state.isLoadingGetBlogs = false
            state.blogs = data.payload.blogs
        })
        builder.addCase(getBlogsAction.rejected, (state) => {
            state.isLoadingGetBlogs = false
        })
    }
})

// get blog by id
const initStateGetBlogById = {
    blog: null,
    author: null,
    isLoadingGetBlogById: false,
    comments: []
}

export const getBlogByIdAction = createAsyncThunk(
    "blog/show",
    async(id) => {
        const {data} = await axios.get(`${apiUrl}/blog/show/${id}`)

        return data
    }
)


export const getBlogByIdSlice = createSlice({
    name: "show",
    initialState: initStateGetBlogById,
    extraReducers: (builder) => {
        builder.addCase(getBlogByIdAction.pending, (state) => {
            state.isLoadingGetBlogById = true
        })
        builder.addCase(getBlogByIdAction.fulfilled, (state, data) => {
            state.isLoadingGetBlogById = false
            state.author = data.payload.author
            state.blog = data.payload.blog
            state.comments = data.payload.comments
        })
    }
})


const blogReducer = combineReducers({
    createBlog: createBlogSlice.reducer,
    getBlogs: getBlogsSlice.reducer,
    getBlogById: getBlogByIdSlice.reducer
})

export default blogReducer