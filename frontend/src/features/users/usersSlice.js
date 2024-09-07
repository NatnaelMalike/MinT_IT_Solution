import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Nati Doe", age: 25 },
]
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loaded: state => state.users,
    }
})
export const selectAllUsers = state => state.users
export default usersSlice.reducer