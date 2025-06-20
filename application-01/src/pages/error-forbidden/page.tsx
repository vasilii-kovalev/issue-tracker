import {
	type FC,
	Fragment,
} from "react";

import {
	type WithChildren,
} from "@/types/with-children";

type ErrorForbiddenPageProps = WithChildren;

const ErrorForbiddenPage: FC<ErrorForbiddenPageProps> = ({
	children,
}) => {
	return (
		<Fragment>
			{children}
		</Fragment>
	);
};

export {
	ErrorForbiddenPage,
};
