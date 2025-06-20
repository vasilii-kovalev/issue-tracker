import {
	FlexRow,
	Panel,
	Text,
} from "@epam/loveship";
import {
	type FC,
} from "react";
import {
	Navigate,
	useNavigate,
} from "react-router";

import {
	Page,
} from "@/components/page/page";
import {
	usersApi,
} from "@/features/users/api";
import {
	useLoginPageRedirectPathname,
} from "@/routes/hooks/use-params";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	LoginForm,
} from "./components/login-form";
import {
	PageCode,
} from "./i18n";
import classes from "./login-page.module.css";

const LoginPage: FC = () => {
	const redirectPathname = useLoginPageRedirectPathname();
	const navigate = useNavigate();

	const onSuccess = (): void => {
		void navigate(
			redirectPathname,
			{
				replace: true,
			},
		);
	};

	return (
		<Page
			className={classes.page}
		>
			<Panel
				cx={classes.pageContent}
				shadow={true}
			>
				<FlexRow
					justifyContent="center"
				>
					<Text
						color="primary"
					>
						<h1
							id="page-title"
						>
							{PageCode.PAGE_HEADER}
						</h1>
					</Text>
				</FlexRow>

				<LoginForm
					onSuccess={onSuccess}
				/>
			</Panel>
		</Page>
	);
};

const LoginPageWithRedirect: FC = () => {
	const redirectPathname = useLoginPageRedirectPathname();

	const {
		data,
		isUninitialized,
		isFetching,
		isLoading,
		error,
	} = usersApi.endpoints.getCurrentUser.useQuery(undefined);

	if (
		isUninitialized
		|| isLoading
		|| isFetching
	) {
		return null;
	}

	if (
		isUndefined(error)
		&& !isUndefined(data)
	) {
		// Navigating to the main page if the user is already logged in,
		return (
			<Navigate
				replace={true}
				to={redirectPathname}
			/>
		);
	}

	return (
		<LoginPage/>
	);
};

export default LoginPageWithRedirect;
