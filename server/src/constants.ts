// Inspired by: https://github.com/axios/axios/blob/v1.x/lib/helpers/HttpStatusCode.js
enum ResponseStatus {
	/* eslint-disable @typescript-eslint/no-magic-numbers */
	// Successful responses.
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,

	// Client error responses.
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,

	// Server error responses.
	INTERNAL_SERVER_ERROR = 500,
	/* eslint-enable */
}

export {
	ResponseStatus,
};
