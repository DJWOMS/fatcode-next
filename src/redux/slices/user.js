import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initial(state, action) {
            state.isInitialized = true;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },
        loginSite(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        registerSite(state, action) {
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutSite(state, action) {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export default slice.reducer;
export const { initial, loginSite, registerSite, logoutSite } = slice.actions;