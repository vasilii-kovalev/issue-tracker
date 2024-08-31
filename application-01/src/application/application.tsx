import {
	Button,
	FlexRow,
	NotificationCard,
	Text,
} from "@epam/loveship";
import {
	useUuiContext,
} from "@epam/uui-core";
import reactLogo from "assets/react.svg";
import {
	type User,
} from "models/user/types";
import {
	type FC,
	useEffect,
} from "react";
import {
	logError,
} from "utilities/log-error";

import styles from "./application.module.css";

const Application: FC = () => {
	const {
		uuiNotifications,
	} = useUuiContext();

	useEffect(
		() => {
			const getUsers = async (): Promise<void> => {
				try {
					const response = await fetch("/api/users");

					const users = (await response.json()) as Array<User>;

					console.log(users);
				} catch (error) {
					logError(error);
				}
			};

			void getUsers();
		},
		[],
	);

	const handleClick = async (): Promise<void> => {
		try {
			await uuiNotifications.show((notificationProps) => {
				return (
					<NotificationCard
						{...notificationProps}
						color="info"
					>
						<Text
							color="primary"
						>
							Hello!
						</Text>
					</NotificationCard>
				);
			});
		} catch (error) {
			logError(error);
		}
	};

	return (
		<>
			<FlexRow
				spacing={null}
			>
				<Text
					color="primary"
					fontSize="24"
					size="48"
				>
					Project 1
				</Text>
			</FlexRow>

			<img
				alt="React logo"
				className={`${styles.logo} ${styles.react}`}
				src={reactLogo}
			/>

			<Button
				caption="Click me"
				onClick={() => {
					void handleClick();
				}}
			/>
		</>
	);
};

export {
	Application,
};
