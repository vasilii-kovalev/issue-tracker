import {
	getStore,
} from "./utilities/get-store";

const store = getStore();

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

export {
	type Dispatch,
	type RootState,
	store,
};
