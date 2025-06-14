import {
	type UserId,
} from "@/features/users/types";

interface PageParams extends Record<string, string | undefined> {
	userId: UserId;
}

export type {
	PageParams,
};
