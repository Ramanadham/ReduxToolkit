import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchToken = createAsyncThunk(
	"dataloader/fetchToken",
	async () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: "TestUser", password: "password" }),
		};
		return await fetch(
			`${process.env.REACT_APP_API_URL}/api/token`,
			requestOptions
		).then((res) => res.json());
	}
);

const tokenSlice = createSlice({
	name: "tokenloader",
	initialState: {
		token: {},
		status: "idle",
		error: null,
		auth: null,
		authTime: null,
	},
	reducers: {
		tokenAuth: (state, action) => {
			state.auth = action.payload.tokenAuthentication;
		},
	},
	extraReducers: {
		[fetchToken.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchToken.fulfilled]: (state, { payload }) => {
			state.token = payload.token;
			state.authTime = Date().toLocaleString();
			state.status = "success";
		},
		[fetchToken.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		},
	},
});

export const { tokenAuth } = tokenSlice.actions;

export const jwtAuth = (token) => (dispatch) => {
	const requestOptions = {
		method: "POST",
		headers: {
			Authorization: token,
		},
	};

	fetch(`${process.env.REACT_APP_API_URL}/api/authenticate`, requestOptions)
		.then(async (res) => await res.json())
		.then(async (data) => {
			await dispatch(tokenAuth(data));
		});
};

export const selectToken = (state) => state.tokenloader.token;
export const authStatus = (state) => state.tokenloader.auth;
export const authTime = (state) => state.tokenloader.authTime;
export default tokenSlice.reducer;
