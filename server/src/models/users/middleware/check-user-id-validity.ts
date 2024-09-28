import {
	type onRequestAsyncHookHandler,
	type RawReplyDefaultExpression,
	type RawRequestDefaultExpression,
	type RawServerDefault,
} from "fastify";
import mongoose from "mongoose";

import {
	ResponseStatus,
} from "@/constants/api";
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
	const {
		id,
	} = request.params;

	const isValidUserId = mongoose.isValidObjectId(id);

	if (!isValidUserId) {
		return await response
			.status(ResponseStatus.BAD_REQUEST)
			.send({
				message: `Incorrect user ID: "${id}".`,
				validationErrors: [
					{
						message: `Incorrect user ID: "${id}".`,
						path: "params.id",
					},
				],
			} satisfies ErrorResponse);
	}
};

export {
	checkUserIdValidity,
};
