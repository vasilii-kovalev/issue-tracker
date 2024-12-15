import {
	type Prisma,
} from "@prisma/client";
import {
	type FastifyPluginCallback,
} from "fastify";

import {
	ResponseStatus,
} from "@/constants/api";
import {
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
	getSortingParameters,
} from "@/models/pagination/utilities/get-sorting-parameters";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	RoleId,
	ROLES_ORDER_BY_DEFAULT,
} from "./constants";
import {
	checkRoles,
} from "./middleware/check-roles";
import {
	RolesPaginatedPageQueryParamsSchema,
	RolesPaginatedPageSchema,
} from "./schemas";
import {
	ROLE_FULL_SELECTOR,
} from "./selectors";
import {
	type RoleFull,
	type RolesPaginatedPage,
	type RolesPaginatedPageQueryParams,
} from "./types";
import {
	getRoleFull,
} from "./utilities/get-role-full";

const rolesRoutes: FastifyPluginCallback = (
	server,
	options,
	done,
): void => {
	server.get<{
		Querystring: RolesPaginatedPageQueryParams;
		Reply: RolesPaginatedPage | ErrorResponse;
	}>(
		"/api/roles/full",
		{
			attachValidation: true,
			onRequest: [
				checkJwt,
				checkRoles([
					RoleId.ADMIN,
				]),
			],
			schema: {
				querystring: RolesPaginatedPageQueryParamsSchema,
				response: {
					[ResponseStatus.OK]: {
						...RolesPaginatedPageSchema,
						description: "Paginated roles with relations.",
					},
					[ResponseStatus.BAD_REQUEST]: ResponseWithStatusBadRequestSchema,
					[ResponseStatus.UNAUTHORIZED]: ResponseWithStatusUnauthorized,
					[ResponseStatus.FORBIDDEN]: ResponseWithStatusForbidden,
					[ResponseStatus.INTERNAL_SERVER_ERROR]: ResponseWithStatusInternalServerErrorSchema,
				},
				summary: "Get paginated roles with relations",
				tags: [
					SchemaTag.ROLES,
				],
			},
		},
		async (request, response) => {
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
				count,
				id,
				pageNumber,
				sorting,
			} = request.query;

			try {
				const sortingParameters = getSortingParameters({
					allowedFields: [
						"createdDate",
						"id",
						"updatedDate",
					] satisfies Array<keyof RoleFull>,
					sortingString: sorting,
				});

				const filterParameters: Prisma.RoleWhereInput = {
					id: {
						contains: id,
					},
				};

				const [
					roles,
					rolesTotalCount,
				] = await prismaClient.$transaction([
					prismaClient.role.findMany({
						orderBy: [
							...sortingParameters,
							/*
								If there are multiple values with the same key, Prisma uses the first value in the array.
								That's why the defaults are put at the end - values from the request take precedence,
								then the defaults fill in the gaps.
							*/
							...ROLES_ORDER_BY_DEFAULT,
						],
						select: ROLE_FULL_SELECTOR,
						skip: count * (pageNumber - 1),
						take: count,
						where: filterParameters,
					}),
					prismaClient.role.count({
						where: filterParameters,
					}),
				]);

				return await response
					.status(ResponseStatus.OK)
					.send({
						data: roles.map<RoleFull>((role) => {
							return getRoleFull(role);
						}),
						pagesTotalCount: Math.ceil(rolesTotalCount / count),
					});
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
