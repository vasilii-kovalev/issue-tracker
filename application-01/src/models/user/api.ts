import {
	getEndpointUrl,
} from "@/models/api/utilities/get-endpoint-url";
import {
	api,
} from "@/store/api";

import {
	type User,
} from "./types";

const userApi = api.injectEndpoints({
	endpoints: (build) => {
		return {
			getCurrentUser: build.query<
				User,
				undefined
			>({
				query: () => {
					const url = getEndpointUrl(
						"/api/users/current",
					);

					return {
						method: "GET",
						url: url.toString(),
					};
				},
			}),
		};
	},
});

export {
	userApi,
};
