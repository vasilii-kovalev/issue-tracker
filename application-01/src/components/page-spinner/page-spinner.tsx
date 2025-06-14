import {
	Blocker,
} from "@epam/loveship";
import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	selectIsPageSpinnerVisible,
} from "@/features/page-spinner/store/selectors";

const PageSpinner: FC = () => {
	const isVisible = useSelector(selectIsPageSpinnerVisible);

	return (
		<Blocker
			isEnabled={isVisible}
		/>
	);
};

export {
	PageSpinner,
};
