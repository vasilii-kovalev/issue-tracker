import {
	getEndpointUrl,
} from "@/models/api/utilities/get-endpoint-url";
import {
	api,
	ApiTagType,
} from "@/store/api";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type User,
	type UserLogin,
	type UserLoginResponse,
} from "./types";

const userApi = api.injectEndpoints({
	endpoints: (build) => {
		return {
			getCurrentUser: build.query<
				User,
				undefined
			>({
				providesTags: (
					result,
					error,
				) => {
					if (
						!isUndefined(error)
						|| isUndefined(result?.id)
					) {
						return [];
					}

					return [
						{
							id: result.id,
							type: ApiTagType.USER,
						},
					];
				},
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
			loginUser: build.mutation<
				UserLoginResponse,
				UserLogin
			>({
				invalidatesTags: (
					result,
					error,
				) => {
					if (
						!isUndefined(error)
						|| isUndefined(result?.id)
					) {
						return [];
					}

					return [
						{
							id: result.id,
							type: ApiTagType.USER,
						},
					];
				},
				query: ({
					email,
					password,
				}) => {
					const url = getEndpointUrl(
						"/api/auth/login",
					);

					return {
						body: {
							email,
							password,
						},
						method: "POST",
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
