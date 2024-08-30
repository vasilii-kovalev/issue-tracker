const isError = (error: unknown): boolean => {
	return error instanceof Error && typeof error.message === "string" && error.message.length !== 0;
};

export { isError };
