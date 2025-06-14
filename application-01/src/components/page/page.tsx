import classNames from "classnames";
import {
	type DetailedHTMLProps,
	type FC,
	type HTMLAttributes,
} from "react";

import classes from "./page.module.css";

type PageProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

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
