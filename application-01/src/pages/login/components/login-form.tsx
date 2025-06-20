import CircleLoaderIcon from "@epam/assets/icons/loaders/circle-loader.svg?react";
import {
	Button,
	FlexRow,
	FlexSpacer,
	LabeledInput,
	TextInput,
} from "@epam/loveship";
import {
	type FC,
} from "react";

import {
	useLoginForm,
} from "@/hooks/use-login-form";

interface LoginFormProps {
	onSuccess: () => void;
}

const LoginForm: FC<LoginFormProps> = ({
	onSuccess,
}) => {
	const {
		// eslint-disable-next-line @typescript-eslint/unbound-method
		save,
		lens,
		isInProgress,
	} = useLoginForm({
		onSuccess,
	});

	return (
		<form
			aria-labelledby="page-title"
		>
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
					{...lens.prop("password").toProps()}
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
		</form>
	);
};

export {
	LoginForm,
};
