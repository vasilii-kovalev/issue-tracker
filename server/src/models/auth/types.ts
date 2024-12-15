import {
	type User,
} from "@/models/users/types";

interface JwtPayload {
	payload: User["id"];
}

export type {
	JwtPayload,
};
