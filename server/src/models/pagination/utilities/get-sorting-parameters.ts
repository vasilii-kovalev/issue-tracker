import {
	Prisma,
} from "@prisma/client";

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

type SortingParameter<Key extends PropertyKey> = Partial<Record<Key, Prisma.SortOrder>>;

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
						order === Prisma.SortOrder.asc
						|| order === Prisma.SortOrder.desc
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
