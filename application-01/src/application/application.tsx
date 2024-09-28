import {
	Button,
	FlexRow,
	NotificationCard,
} from "@epam/loveship";
import {
	useUuiContext,
} from "@epam/uui-core";
import {
	type FC,
	useState,
} from "react";

import reactLogo from "@/assets/react.svg";
import {
	Text,
} from "@/components/uui/text";
import {
	type ErrorResponse,
} from "@/models/errors/types";
import {
	getUsers,
} from "@/models/user/endpoints";
import {
	type User,
} from "@/models/user/types";
import {
	isEmpty,
} from "@/utilities/is-empty";
import {
	logError,
} from "@/utilities/log-error";

import styles from "./application.module.css";

const Application: FC = () => {
	const {
		uuiNotifications,
	} = useUuiContext();

	const [
		users,
		setUsers,
	] = useState<Array<User>>([]);

	const fetchUsers = async (): Promise<void> => {
		try {
			const {
				data: paginatedUsers,
			} = await getUsers({
				count: 1,
				pageNumber: 1,
			});

			setUsers(paginatedUsers);

			void uuiNotifications.show((notificationProps) => {
				return (
					<NotificationCard
						{...notificationProps}
						color="info"
					>
						<Text>
							Users are fetched successfully.
						</Text>
					</NotificationCard>
				);
			});
		} catch (error) {
			logError(error);

			const typedError = error as ErrorResponse | Error;

			const notifications: Array<string> = (
				"validationErrors" in typedError
					? typedError.validationErrors.map((validationError) => {
						return validationError.message;
					})
					: [
						typedError.message,
					]
			);

			notifications.forEach((notificationTex) => {
				void uuiNotifications.show((notificationProps) => {
					return (
						<NotificationCard
							{...notificationProps}
							color="error"
						>
							<Text>
								{notificationTex}
							</Text>
						</NotificationCard>
					);
				});
			});
		}
	};

	return (
		<>
			<FlexRow
				spacing={null}
			>
				<img
					alt="React logo"
					className={`${styles.logo} ${styles.react}`}
					src={reactLogo}
				/>
			</FlexRow>

			<FlexRow
				spacing={null}
			>
				<Button
					caption="Click me"
					onClick={() => {
						void fetchUsers();
					}}
				/>
			</FlexRow>

			{
				!isEmpty(users)
					? (
						<ul>
							{
								users.map((user) => {
									return (
										<li
											key={user.id}
										>
											<Text>
												{user.displayedName}
											</Text>
										</li>
									);
								})
							}
						</ul>
					)
					: null
			}
		</>
	);
};

export {
	Application,
};
