import { createAsyncThunk, createSlice, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl, keyToken } from "../../common/consts";


// add category
const initStateAddCategory = {
    isLoadingAddCategory: false,
    successAddCategory: false
}


export const addCategoryAction = createAsyncThunk(
    "category/add",
    async (categoryData) => {

        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(keyToken)}`,
                "Content-Type" :'multipart/form-data'
            }
        }
        const {data} = await axios.post(`${apiUrl}/category/add`, categoryData, config)
        console.log(data)

        return data
    }
)


export const addCategorySlice = createSlice({
    name:"add",
    initialState: initStateAddCategory,
    extraReducers: (builder) => {
        builder.addCase(addCategoryAction.pending, (state) => {
            state.isLoadingAddCategory = true
        })
        builder.addCase(addCategoryAction.fulfilled, (state) => {
            state.isLoadingAddCategory = false
            state.successAddCategory = true
        })
        builder.addCase(addCategoryAction.rejected, (state) => {
            state.isLoadingAddCategory = false
            state.successAddCategory = false
        })
    }
})


// get categories
const initGetCategories = {
    isLoadingGetCategories: false,
    successGetCategories: false,
    categories: null
}

export const getCategoriesAction = createAsyncThunk(
    "category/view",
    async ({number, page}) => {
        
        const {data} = await axios.get(`${apiUrl}/category/view?number=${number}&page=${page}`)

        return data
    }
)

export const getCategoriesSlice = createSlice({
    name:"view",
    initialState: initGetCategories,
    extraReducers: (builder) => {
        builder.addCase(getCategoriesAction.pending, (state) => {
            state.isLoadingGetCategories = true
        })
        builder.addCase(getCategoriesAction.fulfilled, (state, data) => {
            state.isLoadingGetCategories = false
            state.categories = data.payload.categories
            state.successGetCategories = true
        })
        builder.addCase(getCategoriesAction.rejected, (state) => {
            state.isLoadingGetCategories = false
            state.successGetCategories = false
        })
    }
})


// get size categories
const initStateGetSizeCategories = {
    number: 0
}

export const getSizeCategoriesAction = createAsyncThunk(
    "categories/length",
    async () => {
        const {data} = await axios.get(`${apiUrl}/category/length`)

        return data
    }
)

export const getSizeCategoriesSlice = createSlice({
    name: "size",
    initialState: initStateGetSizeCategories,
    extraReducers: (builder) => {
        builder.addCase(getSizeCategoriesAction.fulfilled, (state, data) => {
            state.number = data.payload.number
        })
    }
})

// get all categories
const initGetAllCategories = {
    categories: [],
    isLoadingGetAllCategories: false
}

export const getAllCategoriesAction = createAsyncThunk(
    "category/all",
    async () => {
        const {data} = await axios.get(`${apiUrl}/category/all`)

        return data
    }
)

export const getAllCategoriesSlice = createSlice({
    name: "all",
    initialState: initGetAllCategories,
    extraReducers: (builder) => {
        builder.addCase(getAllCategoriesAction.pending, (state) => {
            state.isLoadingGetAllCategories = true
        })
        builder.addCase(getAllCategoriesAction.fulfilled, (state, data) => {
            state.isLoadingGetAllCategories = false
            state.categories = data.payload
        })
        builder.addCase(getAllCategoriesAction, (state) => {
            state.isLoadingGetAllCategories = false
        })
    }
})

// Reducer
const categoryReducer = combineReducers({
    addCategory: addCategorySlice.reducer,
    getCategories: getCategoriesSlice.reducer,
    getSizeCategories: getSizeCategoriesSlice.reducer,
    getAllCategories: getAllCategoriesSlice.reducer
})






export default categoryReducer