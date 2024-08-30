import { Button, FlexRow, NotificationCard, Text } from "@epam/loveship";
import { useUuiContext } from "@epam/uui-core";
import type { FC } from "react";

import reactLogo from "assets/react.svg";

import styles from "./application.module.css";

const Application: FC = () => {
	const { uuiNotifications } = useUuiContext();

	return (
		<>
			<FlexRow>
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
					void uuiNotifications.show((notificationProps) => {
						return (
							<NotificationCard
								{...notificationProps}
								color="info"
							>
								<Text color="primary">Hello!</Text>
							</NotificationCard>
						);
					});
				}}
			/>
		</>
	);
};

export { Application };
