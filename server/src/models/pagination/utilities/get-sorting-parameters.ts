import {
	SortOrder,
} from "@/db/prisma/internal/prismaNamespace";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type SortingString,
} from "../types";

interface GetSortingParametersParams<Key> {
	sortingString: SortingString | undefined;
	allowedFields: Array<Key>;
}

type SortingParameter<Key extends PropertyKey> = Partial<Record<Key, SortOrder>>;

const getSortingParameters = <Key extends PropertyKey>({
	allowedFields,
	sortingString = "",
}: GetSortingParametersParams<Key>): Array<SortingParameter<Key>> => {
	try {
		const keyOrderPairs = sortingString.split(";");

		return keyOrderPairs.reduce<Array<SortingParameter<Key>>>(
			(
				sortingParametersCurrent,
				keyOrderPair,
			) => {
				const [
					key,
					order,
				] = keyOrderPair.split(":");

				const typedKey = key as Key;

				if (
					allowedFields.includes(typedKey)
					&& (
						order === SortOrder.asc
						|| order === SortOrder.desc
					)
				) {
					const existingSortingParameter = sortingParametersCurrent.find((sortingParameter) => {
						return !isUndefined(sortingParameter[typedKey]);
					});

					if (!isUndefined(existingSortingParameter)) {
						existingSortingParameter[typedKey] = order;
					} else {
						sortingParametersCurrent.push({
							[typedKey]: order,
						// `satisfies` doesn't work here.
						} as SortingParameter<Key>);
					}
				}

				return sortingParametersCurrent;
			},
			[],
		);
	} catch (error) {
		console.error(error);

		return [];
	}
};

export {
	getSortingParameters,
};
