import { combineReducers, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { apiUrl, keyToken} from "../../common/consts";

// register user
const initStateRegisterUser = {
    isLoadingRegisterUser: false,
    successRegisterUser : false
}


export const registerUserAction = createAsyncThunk(
    "user/register",
    async(registerData) => {
        const config = {
            headers: {
                "Content-Type" :'multipart/form-data'
            }
        }

        const {data} = await axios.post(`${apiUrl}/user/add`, registerData, config)
        return data
    }
)

export const registerSlice = createSlice({
    name: "register",
    initialState: initStateRegisterUser,
    extraReducers: (builder) => {
        builder.addCase(registerUserAction.pending, (state) => {
            state.isLoadingRegisterUser = true
        })
        builder.addCase(registerUserAction.fulfilled, (state) => {
            state.isLoadingRegisterUser = false
            state.successRegisterUser = true
        })
        builder.addCase(registerUserAction.rejected, (state) => {
            state.isLoadingRegisterUser = false
            state.successRegisterUser = false
        })
    }
})


// get user by token
const initStateGetUserByToken = {
    isLoadingGetUserByToken: false,
    successGetUserByToken: false,
    user: null,
    role: null
}

export const getUserByTokenAction = createAsyncThunk(
    "user/getUserToken",
    async () => {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(keyToken)}`
            }
        }

        const {data} = await axios.get(`${apiUrl}/user/info`, config)
        return data
    }
)


export const getUserByTokenSlice = createSlice({
    name: "getUserToken",
    initialState: initStateGetUserByToken,
    extraReducers: (builder) => {
        builder.addCase(getUserByTokenAction.pending, (state) => {
            state.isLoadingGetUserByToken = true
        })
        builder.addCase(getUserByTokenAction.fulfilled, (state, data) => {
            state.isLoadingGetUserByToken = false
            state.user = data.payload.user
            state.successGetUserByToken = true
            state.role = data.payload.role
        })
        builder.addCase(getUserByTokenAction.rejected, (state) => {
            state.isLoadingGetUserByToken = false
            state.successGetUserByToken = true
            state.role = false
        })
    }
})



const userReducer = combineReducers({
    registerUser: registerSlice.reducer,
    getUserByToken: getUserByTokenSlice.reducer
})

export default userReducer