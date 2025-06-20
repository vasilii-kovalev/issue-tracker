import {
	type RootState,
} from "@/store/types";

import {
	type PageSpinnerState,
} from "./slice";

const selectIsPageSpinnerVisible = (
	state: RootState,
): PageSpinnerState["isVisible"] => {
	return state.pageSpinnerReducer.isVisible;
};

export {
	selectIsPageSpinnerVisible,
};
