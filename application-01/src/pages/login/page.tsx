import {
	type FC,
	type FormEvent,
} from "react";
import {
	useNavigate,
} from "react-router";

import {
	userApi,
} from "@/models/user/api";
import {
	isString,
} from "@/utilities/is-string";
import {
	logError,
} from "@/utilities/log-error";

const SignInPage: FC = () => {
	const navigate = useNavigate();

	const [
		loginUser,
		{
			isLoading,
		},
	] = userApi.endpoints.loginUser.useMutation();

	const submitForm = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		try {
			const email = formData.get("email");
			const password = formData.get("password");

			// To satisfy TypeScript.
			if (
				!isString(email)
				|| !isString(password)
			) {
				return;
			}

			const {
				id,
			} = await loginUser({
				email,
				password,
			})
				.unwrap();

			void navigate(
				`/users/${id}/dashboard`,
				{
					replace: true,
				},
			);
		} catch (error) {
			logError(error);
		}
	};

	return (
		<>
			<h1>
				Login
			</h1>

			<form
				onSubmit={(event) => {
					void submitForm(event);
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
		</>
	);
};

export default SignInPage;
