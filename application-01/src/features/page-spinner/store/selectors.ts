import {
	type RootState,
} from "@/store/store";

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
