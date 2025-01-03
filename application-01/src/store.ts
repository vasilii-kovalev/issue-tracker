import {
	configureStore,
} from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {},
});

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

export {
	type Dispatch,
	type RootState,
	store,
};
