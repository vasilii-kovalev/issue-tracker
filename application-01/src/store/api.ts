import {
	createApi,
	type FetchArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import {
	HttpStatus,
} from "@/constants";

enum ApiTagType {
	CURRENT_USER = "CURRENT_USER",
	USER = "USER",
}

const baseQuery = fetchBaseQuery({
	baseUrl: "/api",
});

const api = createApi({
	baseQuery: async (args: string | FetchArgs, requestApi, extraOptions) => {
		const result = await baseQuery(
			args,
			requestApi,
			extraOptions,
		);

		if (result.error?.status === HttpStatus.UNAUTHORIZED) {
			requestApi.dispatch(
				api.util.invalidateTags([
					ApiTagType.CURRENT_USER,
				]),
			);
		}

		return result;
	},
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
