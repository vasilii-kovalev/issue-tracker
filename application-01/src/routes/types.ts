import {
	type InferOutput,
} from "valibot";

import {
	type LoginPageLocationSchema,
	type UserDashboardPageSchema,
} from "./schemas";

type UserDashboardPageParams = InferOutput<typeof UserDashboardPageSchema>;

type LoginPageLocation = InferOutput<typeof LoginPageLocationSchema>;

export {
	type LoginPageLocation,
	type UserDashboardPageParams,
};
