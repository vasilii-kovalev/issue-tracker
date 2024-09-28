import {
	type onRequestAsyncHookHandler,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants/api";
import {
	type ErrorResponse,
	type ErrorResponseWithValidationErrors,
	type ValidationError,
} from "@/models/errors/types";
import {
	isEmpty,
} from "@/utilities/is-empty";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type PaginatedPageQueryParams,
} from "../types";

const COUNT_MIN = 1;
const COUNT_MAX = 100;
const PAGE_NUMBER_MIN = 1;

const checkPaginationPageQueryParams: onRequestAsyncHookHandler = async (request, response) => {
	try {
		const validationErrors: Array<ValidationError> = [];

		const {
			count,
			pageNumber,
		} = request.query as Partial<PaginatedPageQueryParams>;

		if (isUndefined(count)) {
			validationErrors.push({
				message: "\"count\" query parameter is required, but was not provided.",
				path: "count",
			});
		} else {
			// `Number.parseInt` rounds the value, which is undesirable for the validation.
			const parsedCount = Number.parseFloat(count);

			if (!Number.isInteger(parsedCount)) {
				validationErrors.push({
					message: `Incorrect "count" query parameter value: "${count}".`,
					path: "count",
				});
			} else if (parsedCount < COUNT_MIN) {
				validationErrors.push({
					message: `"count" query parameter value can't be less than ${COUNT_MIN}.`,
					path: "count",
				});
			} else if (parsedCount > COUNT_MAX) {
				validationErrors.push({
					message: `"count" query parameter value can't be more than ${COUNT_MAX}.`,
					path: "count",
				});
			}
		}

		if (isUndefined(pageNumber)) {
			validationErrors.push({
				message: "\"pageNumber\" query parameter is required, but was not provided.",
				path: "pageNumber",
			});
		} else {
			// `Number.parseInt` rounds the value, which is undesirable for the validation.
			const parsedPageNumber = Number.parseFloat(pageNumber);

			if (!Number.isInteger(parsedPageNumber)) {
				validationErrors.push({
					message: `Incorrect "pageNumber" query parameter value: "${pageNumber}".`,
					path: "pageNumber",
				});
			} else if (parsedPageNumber < PAGE_NUMBER_MIN) {
				validationErrors.push({
					message: `"pageNumber" query parameter value can't be less than ${PAGE_NUMBER_MIN}.`,
					path: "pageNumber",
				});
			}
		}

		if (!isEmpty(validationErrors)) {
			return await response
				.status(ResponseStatus.BAD_REQUEST)
				.send({
					validationErrors,
				} satisfies ErrorResponseWithValidationErrors);
		}
	} catch (error) {
		const typedError = error as Error;

		return await response
			.status(ResponseStatus.INTERNAL_SERVER_ERROR)
			.send({
				message: typedError.message,
			} satisfies ErrorResponse);
	}
};

export {
	checkPaginationPageQueryParams,
};
