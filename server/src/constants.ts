// Inspired by: https://github.com/axios/axios/blob/v1.x/lib/helpers/HttpStatusCode.js
enum ResponseStatus {
	/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-magic-numbers */
	// Successful responses.
	Ok = 200,
	Created = 201,
	NoContent = 204,

	// Client error responses.
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,

	// Server error responses.
	InternalServerError = 500,
	/* eslint-enable */
}

export {
	ResponseStatus,
};
