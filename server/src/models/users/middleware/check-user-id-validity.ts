import {
	type onRequestAsyncHookHandler,
	type RawReplyDefaultExpression,
	type RawRequestDefaultExpression,
	type RawServerDefault,
} from "fastify";
import mongoose from "mongoose";

import {
	ResponseStatus,
} from "@/constants";
import {
	ErrorCode,
} from "@/models/errors/constants";
import {
	type ErrorResponse,
} from "@/models/errors/types";

import {
	type UserId,
} from "../types";

const checkUserIdValidity: onRequestAsyncHookHandler<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{
		Params: {
			id: UserId;
		};
	}
> = async (request, response) => {
	const userId = request.params.id;

	const isValidUserId = mongoose.isValidObjectId(userId);

	if (!isValidUserId) {
		const status = ResponseStatus.BAD_REQUEST;

		return await response
			.status(status)
			.send({
				code: ErrorCode.BAD_REQUEST,
				entities: [
					"id",
				],
				status,
			} satisfies ErrorResponse);
	}
};

export {
	checkUserIdValidity,
};
