import classNames from "classnames";
import {
	type ComponentProps,
	type FC,
} from "react";

import classes from "./page.module.css";

type PageProps = ComponentProps<"div">;

const Page: FC<PageProps> = ({
	className,
	...otherProps
}) => {
	return (
		<div
			{...otherProps}
			className={
				classNames(
					classes.page,
					className,
				)
			}
		/>
	);
};

export {
	Page,
};
