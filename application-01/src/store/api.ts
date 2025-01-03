import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

enum ApiTagType {
	USER = "USER",
}

const api = createApi({
	baseQuery: fetchBaseQuery(),
	endpoints: () => {
		return {};
	},
	invalidationBehavior: "immediately",
	reducerPath: "api",
	tagTypes: Object.values(ApiTagType),
});

export {
	api,
	ApiTagType,
};
