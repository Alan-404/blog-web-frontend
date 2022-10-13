import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./entities/account";
import userReducer from "./entities/user";
import categoryReducer from "./entities/category";
import blogReducer from "./entities/blog";
import commentReducer from "./entities/comment";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        user: userReducer,
        category: categoryReducer,
        blog: blogReducer,
        comment: commentReducer
    }
})