import {
	type ErrorResponse,
} from "@/models/errors/types";
import {
	getEndpointUrl,
} from "@/utilities/api";

import {
	type UsersPaginatedPage,
} from "./types";

interface GetUsersParams {
	count: number;
	pageNumber: number;
}

const getUsersPaginatedPage = async ({
	count,
	pageNumber,
}: GetUsersParams): Promise<UsersPaginatedPage> => {
	const url = getEndpointUrl(
		"/api/users/page",
		{
			count,
			pageNumber,
		},
	);

	const response = await fetch(url);

	if (response.ok) {
		return await response.json() as UsersPaginatedPage;
	}

	const errorResponse = await response.json() as ErrorResponse;

	// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
	return await Promise.reject(errorResponse);
};

export {
	getUsersPaginatedPage,
};
