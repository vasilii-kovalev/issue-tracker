import classNames from "classnames";
import {
	type FC,
	useState,
} from "react";

import reactLogo from "@/assets/react.svg";
import {
	type ErrorResponse,
} from "@/models/errors/types";
import {
	getUsersPaginatedPage,
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
	const [
		users,
		setUsers,
	] = useState<Array<User>>([]);

	const fetchUsers = async (): Promise<void> => {
		try {
			const {
				data: paginatedUsers,
			} = await getUsersPaginatedPage({
				count: 1,
				pageNumber: 1,
			});

			setUsers(paginatedUsers);

			console.info("Users are fetched successfully.");
		} catch (error) {
			logError(error);

			const typedError = error as ErrorResponse | Error;

			const notifications: Array<string> = (
				"errorCodes" in typedError
					? typedError.errorCodes.map<string>((validationError) => {
						return validationError;
					})
					: [
						typedError.message,
					]
			);

			notifications.forEach((notificationText) => {
				console.error(notificationText);
			});
		}
	};

	return (
		<>
			<div>
				<img
					alt="React logo"
					className={
						classNames(
							styles.logo,
							styles.react,
						)
					}
					src={reactLogo}
				/>
			</div>

			<div>
				<button
					onClick={() => {
						void fetchUsers();
					}}
					type="button"
				>
					Click me
				</button>
			</div>

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
											{user.name}
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
