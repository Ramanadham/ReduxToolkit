import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("dataloader/fetchData", async () => {
	return await fetch(`${process.env.REACT_APP_API_URL}/api/data`).then((res) =>
		res.json()
	);
});

const dataSlice = createSlice({
	name: "dataloader",
	initialState: {
		data: [],
		token: "",
		auth: "",
		status: "idle",
		error: null,
	},
	extraReducers: {
		[fetchData.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchData.fulfilled]: (state, { payload }) => {
			state.data = payload;
			state.status = "success";
		},
		[fetchData.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		},
	},
});

export const selectData = (state) => state.dataloader.data;
export default dataSlice.reducer;
