import { Button, FlexRow, NotificationCard, Text } from "@epam/loveship";
import { useUuiContext } from "@epam/uui-core";
import type { FC } from "react";

import reactLogo from "assets/react.svg";

import styles from "./application.module.css";

const Application: FC = () => {
	const handleClick = async (): Promise<void> => {
		try {
			await uuiNotifications.show((notificationProps) => {
				return (
					<NotificationCard
						{...notificationProps}
						color="info"
					>
						<Text color="primary">Hello!</Text>
					</NotificationCard>
				);
			});
		} catch (error) {
			logError(error);
		}
	};

	return (
		<>
			<FlexRow spacing={null}>
				<Text
					color="primary"
					fontSize="24"
					size="48"
				>
					Project 1
				</Text>
			</FlexRow>

			<img
				src={reactLogo}
				className={`${styles.logo} ${styles.react}`}
				alt="React logo"
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

export { Application };
