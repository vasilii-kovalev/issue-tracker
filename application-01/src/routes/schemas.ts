import {
	type GenericSchema,
	nullable,
	object,
	string,
	unknown,
	type UnknownSchema,
} from "valibot";

import {
	UserIdSchema,
} from "@/features/users/schemas";

const UserDashboardPageSchema = object({
	userId: UserIdSchema,
});

const getLocationSchema = <State extends GenericSchema = UnknownSchema>(
	state: State = unknown() as State,
) => {
	return object({
		pathname: string(),
		state: nullable(state),
	});
};

const LoginPageLocationStateSchema = object({
	from: getLocationSchema(),
});

const LoginPageLocationSchema = getLocationSchema(LoginPageLocationStateSchema);

export {
	LoginPageLocationSchema,
	UserDashboardPageSchema,
};
