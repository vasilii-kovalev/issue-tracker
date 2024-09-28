import {
	// eslint-disable-next-line @typescript-eslint/no-restricted-imports
	DropdownMenuBody as UUIDropdownMenuBody,
} from "@epam/loveship";
import {
	uuiMarkers,
} from "@epam/uui-core";
import classNames from "classnames";

// In pixels.
const DEFAULT_MAX_WITH = 150;

const DropdownMenuBody: typeof UUIDropdownMenuBody = ({
	cx,
	rawProps,
	...props
}) => {
	const {
		togglerWidth = 0,
	} = props;

	return (
		<UUIDropdownMenuBody
			// https://github.com/epam/UUI/issues/1629#issuecomment-1701329887
			cx={
				classNames(
					uuiMarkers.clickable,
					cx,
				)
			}
			rawProps={{
				...rawProps,
				style: {
					// For some reason, `minWidth` as a property also sets `maxWidth` style, which is an unwanted behavior.
					minWidth: Math.max(
						DEFAULT_MAX_WITH,
						togglerWidth,
					),
					...rawProps?.style,
				},
			}}
			{...props}
		/>
	);
};

export {
	DropdownMenuBody,
};
