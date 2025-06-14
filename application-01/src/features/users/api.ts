import {
	type User,
	type UserId,
	type UserLogin,
	type UserLoginResponse,
} from "@/features/users/types";
import {
	api,
	ApiTagType,
} from "@/store/api";
import {
	isUndefined,
} from "@/utilities/is-undefined";

const usersApi = api.injectEndpoints({
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
						|| isUndefined(result)
					) {
						return [];
					}

					return [
						ApiTagType.CURRENT_USER,
					];
				},
				query: () => {
					return {
						method: "GET",
						url: "users/current",
					};
				},
			}),
			getUserById: build.query<
				User,
				UserId
			>({
				keepUnusedDataFor: 0,
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
				query: (userId) => {
					return {
						method: "GET",
						url: `users/${userId}`,
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
					return {
						body: {
							email,
							password,
						},
						method: "POST",
						url: "auth/login",
					};
				},
			}),
		};
	},
});

export {
	usersApi,
};
