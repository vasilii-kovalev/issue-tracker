import {
	type WithId,
} from "@/types";

const getIds = <Id>(
	values: Array<WithId<Id>>,
): Array<Id> => {
	return values.map<Id>((value) => {
		return value.id;
	});
};

export {
	getIds,
};
