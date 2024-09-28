import {
	type ErrorResponse,
} from "@/models/errors/types";
import {
	getEndpointUrl,
} from "@/utilities/api";

import {
	type PaginatedUsers,
} from "./types";

interface GetUsersParams {
	count: number;
	pageNumber: number;
}

const getUsers = async ({
	count,
	pageNumber,
}: GetUsersParams): Promise<PaginatedUsers> => {
	const url = getEndpointUrl(
		"/api/users",
		{
			count,
			pageNumber,
		},
	);

	const response = await fetch(
		url,
	);

	if (response.ok) {
		return await response.json() as PaginatedUsers;
	}

	const errorResponse = await response.json() as ErrorResponse;

	// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
	return await Promise.reject(errorResponse);
};

export {
	getUsers,
};
