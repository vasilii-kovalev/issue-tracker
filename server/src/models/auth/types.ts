import {
	type UserId,
} from "@/models/users/types";

interface JwtPayload {
	payload: UserId;
}

export type {
	JwtPayload,
};
