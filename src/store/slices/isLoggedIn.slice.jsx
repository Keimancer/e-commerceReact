import { createSlice } from '@reduxjs/toolkit';

export const isLoggedInSlice = createSlice({
    name: 'isLoggedIn',
    initialState: false,
    reducers: {
        setLoggedState: ( state, action ) => {
            return action.payload;
        }
    }
})

export const { setLoggedState } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
