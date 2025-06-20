import {
	useLocation,
	useParams,
} from "react-router";
import {
	parse,
} from "valibot";

import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	RoutePath,
} from "../constants";
import {
	LoginPageLocationSchema,
	UserDashboardPageSchema,
} from "../schemas";
import {
	type UserDashboardPageParams,
} from "../types";

const useUserDashboardPageParams = (): UserDashboardPageParams => {
	const params = useParams();

	return parse(
		UserDashboardPageSchema,
		params,
	);
};

const useLoginPageRedirectPathname = (): string => {
	const location = useLocation();

	const loginPageLocation = parse(
		LoginPageLocationSchema,
		location,
	);

	const pathname = loginPageLocation.state?.from.pathname;

	if (isUndefined(pathname)) {
		return RoutePath.ROOT;
	}

	return pathname;
};

export {
	useLoginPageRedirectPathname,
	useUserDashboardPageParams,
};
