import {
	type FastifyPluginCallback,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants/api";
import {
	SchemaId,
	SchemaTag,
} from "@/constants/schemas";
import {
	prismaClient,
} from "@/db/client";
import {
	checkJwt,
} from "@/models/auth/middleware/check-jwt";
import {
	ResponseWithStatusBadRequestSchema,
	ResponseWithStatusForbidden,
	ResponseWithStatusInternalServerErrorSchema,
	ResponseWithStatusUnauthorized,
} from "@/models/errors/schema";
import {
	type ErrorResponse,
} from "@/models/errors/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	RoleFilterSchema,
} from "./schemas";
import {
	type Role,
	type RoleFilter,
} from "./types";
import {
	formatSelectedRole,
} from "./utilities/format-selected-role";

const rolesRoutes: FastifyPluginCallback = (
	server,
	options,
	done,
): void => {
	server.get<{
		Querystring: RoleFilter;
		Reply: Array<Role> | ErrorResponse;
	}>(
		"/api/roles",
		{
			attachValidation: true,
			onRequest: [
				checkJwt,
			],
			schema: {
				querystring: RoleFilterSchema,
				response: {
					[ResponseStatus.OK]: {
						description: "Roles list.",
						items: {
							$ref: SchemaId.ROLE,
						},
						type: "array",
					},
					[ResponseStatus.BAD_REQUEST]: ResponseWithStatusBadRequestSchema,
					[ResponseStatus.UNAUTHORIZED]: ResponseWithStatusUnauthorized,
					[ResponseStatus.FORBIDDEN]: ResponseWithStatusForbidden,
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
				},
				summary: "Get roles",
				tags: [
					SchemaTag.ROLES,
				],
			},
		},
		async (
			request,
			response,
		) => {
			const {
				validationError,
			} = request;

			if (!isUndefined(validationError)) {
				return await response
					.status(ResponseStatus.BAD_REQUEST)
					.send({
						errorCodes: [],
						message: validationError.message,
					});
			}

			const {
				description,
			} = request.query;

			try {
				// It is expected, that amount of roles is little enough to not implement pagination.
				const roles = await prismaClient.role.findMany({
					orderBy: {
						description: "asc",
					},
					select: {
						description: true,
						id: true,
					},
					where: {
						description: {
							contains: description,
						},
					},
				});

				const formattedRoles = roles.map<Role>((role) => {
					return formatSelectedRole(role);
				});

				return await response
					.status(ResponseStatus.OK)
					.send(formattedRoles);
			} catch (error) {
				const typedError = error as Error;

				return await response
					.status(ResponseStatus.INTERNAL_SERVER_ERROR)
					.send({
						errorCodes: [],
						message: typedError.message,
					});
			}
		},
	);

	done();
};

export {
	rolesRoutes,
};
