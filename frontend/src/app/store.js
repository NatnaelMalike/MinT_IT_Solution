import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "@/features/users/usersSlice";
export const store = configureStore({
    reducer: {
        users: usersSlice
    }
})