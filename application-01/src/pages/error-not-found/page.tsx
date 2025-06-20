import {
	type FC,
	Fragment,
} from "react";

import {
	PageCode,
} from "./i18n";

const ErrorNotFoundPage: FC = () => {
	return (
		<Fragment>
			{PageCode.PAGE_HEADER}
		</Fragment>
	);
};

export {
	ErrorNotFoundPage,
};
