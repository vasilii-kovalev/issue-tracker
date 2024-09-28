import {
	type User,
} from "@/models/users/types";

interface JwtPayload {
	payload: User;
}

export type {
	JwtPayload,
};
