import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import axios from 'axios'
import {apiUrl} from '../../common/consts'

// login account
const initStateLoginAccount = {
    isLoadingLoginAccount: false,
    successLoginAccount: false,
    accessToken: ""
}

export const loginAccountAction = createAsyncThunk(
    "account/login",
    async (loginData) => {
        const {data} = await axios.post(`${apiUrl}/account/login`, loginData)
        if (data.success){
            localStorage.setItem("blog", data.accessToken)
        }
        console.log(data)
        return data
    }
)

export const loginAccountSlice = createSlice({
    name: "login",
    initialState: initStateLoginAccount,
    extraReducers: (builder) => {
        builder.addCase(loginAccountAction.pending, (state) => {
            state.isLoadingLoginAccount = true
        })
        builder.addCase(loginAccountAction.fulfilled, (state, data) => {
            state.isLoadingLoginAccount = false
            state.successLoginAccount = data.payload.success
            state.accessToken = data.payload.accessToken
        })
        builder.addCase(loginAccountAction.rejected, (state) => {
            state = initStateLoginAccount
        })
    }
})




const accountReducer = combineReducers({
    loginAccount: loginAccountSlice.reducer
})

export default accountReducer