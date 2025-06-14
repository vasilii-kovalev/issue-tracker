import CircleLoaderIcon from "@epam/assets/icons/loaders/circle-loader.svg?react";
import {
	Button,
	FlexRow,
	FlexSpacer,
	LabeledInput,
	Panel,
	Text,
	TextInput,
} from "@epam/loveship";
import {
	type FC,
} from "react";
import {
	type Location,
	useLocation,
	useNavigate,
} from "react-router";

import {
	Page,
} from "@/components/page/page";
import {
	useLoginForm,
} from "@/features/users/hooks/use-login-form";

import classes from "./page.module.css";
import {
	type LocationState,
} from "./types";

const LoginPage: FC = () => {
	const location = useLocation() as Location<LocationState | null>;
	const navigate = useNavigate();

	const {
		// eslint-disable-next-line @typescript-eslint/unbound-method
		save,
		lens,
		isInProgress,
	} = useLoginForm({
		onSuccess: () => {
			void navigate(
				location.state?.from.pathname ?? "/",
				{
					replace: true,
				},
			);
		},
	});

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
					<Text>
						<h1>
							Login
						</h1>
					</Text>
				</FlexRow>

				<FlexRow
					vPadding="24"
				>
					<LabeledInput
						htmlFor="email"
						label="Email"
						size="48"
						{...lens.prop("email").toProps()}
					>
						<TextInput
							id="email"
							placeholder="Email"
							size="48"
							{...lens.prop("email").toProps()}
						/>
					</LabeledInput>
				</FlexRow>

				<FlexRow
					vPadding="24"
				>
					<LabeledInput
						htmlFor="password"
						label="Password"
						size="48"
						{...lens.prop("email").toProps()}
					>
						<TextInput
							id="password"
							placeholder="Password"
							size="48"
							type="password"
							{...lens.prop("password").toProps()}
						/>
					</LabeledInput>
				</FlexRow>

				<FlexRow
					vPadding="24"
				>
					<FlexSpacer/>

					<Button
						caption="Login"
						icon={
							isInProgress
								? CircleLoaderIcon
								: undefined
						}
						isDisabled={isInProgress}
						onClick={save}
						size="48"
					/>
				</FlexRow>
			</Panel>
		</Page>
	);
};

export default LoginPage;
