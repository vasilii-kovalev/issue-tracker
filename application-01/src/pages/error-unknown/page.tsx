import {
	type FC,
	Fragment,
} from "react";

import {
	PageCode,
} from "./i18n";

const ErrorUnknownPage: FC = () => {
	return (
		<Fragment>
			{PageCode.PAGE_HEADER}
		</Fragment>
	);
};

export {
	ErrorUnknownPage,
};
