import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess : (state, action )=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateStart: (state) => {
            state.loading = true
        },
        updateSuccess: (state, action ) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.action = action.payload;
            state.loading = false
        },
        deleteUserStart: (state) => {
            state.loading = true
        },
        deleteUserSuccess : (state, action )=> {
            state.currentUser = null;
            state.loading = false,
            state.error = null;
        },
        deleteUserFailure: (state, action ) => {
            state.error = action.payload;
            state.loading = false
        },
        setToken: (state, value) => {
            state.currentUser.token = value.payload;
        },
        setUser: (state, value) => {
            state.currentUser = value.payload
        },
        saveFcmToken: (state, action) => {
            state.currentUser = {
              ...state.currentUser, // keep other user data intact
              fcmToken: action.payload // store the FCM token
            };
          }
    }
});

export const {signInFailure, signInStart, signInSuccess, updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, setToken, setUser, saveFcmToken} = userSlice.actions;
export default userSlice.reducer;