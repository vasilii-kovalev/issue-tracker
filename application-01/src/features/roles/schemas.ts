import {
	enum_,
} from "valibot";

import {
	RoleId,
} from "./constants";

const RoleIdSchema = enum_(RoleId);

export {
	RoleIdSchema,
};
