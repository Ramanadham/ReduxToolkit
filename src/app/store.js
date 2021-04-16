import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../redux/dataSlice";
import tokenReducer from "../redux/tokenSlice";

export default configureStore({
	reducer: {
		dataloader: dataReducer,
		tokenloader: tokenReducer,
	},
});
