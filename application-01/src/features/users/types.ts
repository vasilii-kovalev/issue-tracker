import {
	type InferOutput,
} from "valibot";

import {
	type UserIdSchema,
	type UserLoginResponseSchema,
	type UserLoginSchema,
	type UserSchema,
	type UsersPaginatedPageSchema,
} from "./schemas";

type UserId = InferOutput<typeof UserIdSchema>;

// https://github.com/fabian-hiller/valibot/issues/1208#issuecomment-2978650087
interface User extends InferOutput<typeof UserSchema> {}

type UserLogin = InferOutput<typeof UserLoginSchema>;

type UserLoginResponse = InferOutput<typeof UserLoginResponseSchema>;

type UsersPaginatedPage = InferOutput<typeof UsersPaginatedPageSchema>;

export {
	type User,
	type UserId,
	type UserLogin,
	type UserLoginResponse,
	type UsersPaginatedPage,
};
