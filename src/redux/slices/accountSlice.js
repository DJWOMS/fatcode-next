const {axiosInstance} = require("utils/axios")
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// post request socials
export const fetchSocilasList = createAsyncThunk(
    'account/fetchSocialsList',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('profiles/user_me/social');
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        socialLinksList: []
    },
    reducers: {
        addSocialLink: (state, action) => {
            state.socialLinksList = action.payload
        }
    },
    extraReducers: {}
})

export const { addSocialLink } = accountSlice.actions;

export default accountSlice.reducer;