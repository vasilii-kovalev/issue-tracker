const sleep = async (
	duration: number,
): Promise<void> => {
	await new Promise((resolve) => {
		setTimeout(
			resolve,
			duration,
		);
	});
};

export {
	sleep,
};
