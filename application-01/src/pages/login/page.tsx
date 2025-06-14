import {
	type FC,
	type FormEvent,
	Fragment,
} from "react";
import {
	type Location,
	useLocation,
	useNavigate,
} from "react-router";

import {
	usersApi,
} from "@/features/users/api";
import {
	isString,
} from "@/utilities/is-string";
import {
	logError,
} from "@/utilities/log-error";

import {
	type LocationState,
} from "./types";

const LoginPage: FC = () => {
	const location = useLocation() as Location<LocationState | null>;
	const navigate = useNavigate();

	const [
		getCurrentUser,
	] = usersApi.endpoints.getCurrentUser.useLazyQuery();
	const [
		loginUser,
		{
			isLoading,
		},
	] = usersApi.endpoints.loginUser.useMutation();

	const handleSubmitForm = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		try {
			const formData = new FormData(event.target as HTMLFormElement);

			const email = formData.get("email");
			const password = formData.get("password");

			// To satisfy TypeScript.
			if (
				!isString(email)
				|| !isString(password)
			) {
				return;
			}

			await loginUser({
				email,
				password,
			})
				.unwrap();

			await getCurrentUser(undefined);

			void navigate(
				location.state?.from.pathname ?? "/",
				{
					replace: true,
				},
			);
		} catch (error) {
			logError(error);
		}
	};

	return (
		<Fragment>
			<h1>
				Login
			</h1>

			<form
				onSubmit={(event) => {
					void handleSubmitForm(event);
				}}
			>
				<input
					disabled={isLoading}
					name="email"
					type="email"
				/>

				<input
					disabled={isLoading}
					name="password"
					type="password"
				/>

				<button
					disabled={isLoading}
					type="submit"
				>
					Login
				</button>
			</form>
		</Fragment>
	);
};

export default LoginPage;
