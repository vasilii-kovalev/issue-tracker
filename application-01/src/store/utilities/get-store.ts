import {
	configureStore,
} from "@reduxjs/toolkit";

import {
	api,
} from "../api";

// In this case, the result type is too complex to define manually.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const getStore = () => {
	return configureStore({
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(api.middleware);
		},
		reducer: {
			[api.reducerPath]: api.reducer,
		},
	});
};

export {
	getStore,
};
