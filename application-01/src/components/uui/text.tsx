import {
	// eslint-disable-next-line @typescript-eslint/no-restricted-imports
	Text as UUIText,
} from "@epam/loveship";
import {
	type ComponentProps,
	forwardRef,
} from "react";

type TextProps = ComponentProps<typeof UUIText>;

/*
	UUI sets an incorrect default value when `color` property is absent or `undefined`,
	and the team is not going to fix it in the nearest future.
	It is fixed in this custom component.
	More info: https://github.com/epam/UUI/issues/2462
*/
const Text = forwardRef<HTMLDivElement, TextProps>((
	{
		color = "primary",
		...props
	},
	ref,
) => {
	return (
		<UUIText
			color={color}
			ref={ref}
			{...props}
		/>
	);
});

Text.displayName = "Text";

export {
	Text,
};
