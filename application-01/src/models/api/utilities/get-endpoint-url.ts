import {
	isEmpty,
} from "@/utilities/is-empty";
import {
	isNull,
} from "@/utilities/is-null";
import {
	isString,
} from "@/utilities/is-string";
import {
	isUndefined,
} from "@/utilities/is-undefined";

type PrimitiveValue =
	| number
	| string
	| boolean
	| undefined
	| null;

type SearchParams = Record<
	string,
	| PrimitiveValue
	| Array<PrimitiveValue>
>;

const getEndpointUrl = (
	endpoint: string,
	searchParams?: SearchParams,
): URL => {
	const url = new URL(
		endpoint,
		window.location.origin,
	);

	if (!isUndefined(searchParams)) {
		Object.entries(searchParams).forEach(([
			key,
			value,
		]) => {
			if (
				isUndefined(value)
				|| isNull(value)
			) {
				return;
			}

			let refinedValue = value;

			if (Array.isArray(refinedValue)) {
				refinedValue = refinedValue.filter((item) => {
					const isEmptyString = (
						isString(item)
						&& isEmpty(item)
					);

					return (
						!isEmptyString
						&& !isUndefined(item)
						&& !isNull(item)
					);
				});
			}

			const stringifiedValue = refinedValue.toString();

			if (!isEmpty(stringifiedValue)) {
				url.searchParams.set(
					key,
					stringifiedValue,
				);
			}
		});
	}

	return url;
};

export {
	getEndpointUrl,
};
