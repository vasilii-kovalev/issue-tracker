const pickByKeys = <
	Type extends object,
	Key extends keyof Type,
>(
	data: Type,
	keys: Array<Key>,
): Pick<Type, Key> => {
	return Object.entries(data).reduce<Pick<Type, Key>>(
		(
			dataWithPickedKeysCurrent,
			[
				key,
				value,
			],
		) => {
			if (keys.includes(key as Key)) {
				// eslint-disable-next-line no-param-reassign
				dataWithPickedKeysCurrent[key as Key] = value as Type[Key];
			}

			return dataWithPickedKeysCurrent;
		},
		// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
		{} as Pick<Type, Key>,
	);
};

export {
	pickByKeys,
};
