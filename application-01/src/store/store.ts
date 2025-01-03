import {
	configureStore,
} from "@reduxjs/toolkit";

import {
	api,
} from "./api";

const store = configureStore({
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(api.middleware);
	},
	reducer: {
		[api.reducerPath]: api.reducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

export {
	type Dispatch,
	type RootState,
	store,
};
