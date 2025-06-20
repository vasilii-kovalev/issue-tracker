import {
	ErrorNotification,
	Text,
	useForm,
} from "@epam/loveship";
import {
	type IFormApi,
	useUuiContext,
} from "@epam/uui-core";
import {
	type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
	safeParse,
} from "valibot";

import {
	getErrorMessage,
} from "@/features/api/utilities/get-error-message";
import {
	usersApi,
} from "@/features/users/api";
import {
	UserLoginSchema,
} from "@/features/users/schemas";
import {
	type UserLogin,
} from "@/features/users/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";
import {
	logError,
} from "@/utilities/log-error";

interface UseLoginFormParams {
	onError?: () => void;
	onStart?: () => void;
	onSuccess?: () => void;
}

const useLoginForm = ({
	onError,
	onStart,
	onSuccess,
}: UseLoginFormParams): IFormApi<UserLogin> => {
	const {
		uuiNotifications,
	} = useUuiContext();

	const [
		loginUser,
	] = usersApi.endpoints.loginUser.useMutation();
	const [
		getCurrentUser,
	] = usersApi.endpoints.getCurrentUser.useLazyQuery();

	return useForm<UserLogin>({
		getMetadata: () => {
			return {
				props: {
					email: {
						isRequired: true,
						validators: [
							(value) => {
								const {
									issues,
								} = safeParse(
									UserLoginSchema.entries.email,
									value,
								);

								const errorMessage = issues?.at(0)?.message;

								if (isUndefined(errorMessage)) {
									return [
										false,
									];
								}

								return [
									errorMessage,
								];
							},
						],
					},
					password: {
						isRequired: true,
						validators: [
							(value) => {
								const {
									issues,
								} = safeParse(
									UserLoginSchema.entries.password,
									value,
								);

								const errorMessage = issues?.at(0)?.message;

								if (isUndefined(errorMessage)) {
									return [
										false,
									];
								}

								return [
									errorMessage,
								];
							},
						],
					},
				},
			};
		},
		onError: async (error: FetchBaseQueryError | Error) => {
			logError(error);

			onError?.();

			const errorMessage = getErrorMessage(error);

			try {
				await uuiNotifications.show(
					(props) => {
						return (
							<ErrorNotification
								{...props}
							>
								<Text
									color="primary"
								>
									{errorMessage}
								</Text>
							</ErrorNotification>
						);
					},
					{
						duration: "forever",
					},
				);
			} catch (notificationError) {
				logError(notificationError);
			}
		},
		onSave: async ({
			email,
			password,
		}) => {
			onStart?.();

			await loginUser({
				email,
				password,
			})
				.unwrap();

			await getCurrentUser(undefined)
				.unwrap();
		},
		onSuccess,
		validationOn: "change",
		value: {
			email: "",
			password: "",
		},
	});
};

export {
	useLoginForm,
};
