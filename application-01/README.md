# Application 01

Status: in progress.

## Technologies

* [Bun](https://bun.sh)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [React Router](https://reactrouter.com)
* [React](https://react.dev)
* [Redux Toolkit](https://redux-toolkit.js.org)
* [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
* [TypeScript](https://www.typescriptlang.org)
* [UUI](https://uui.epam.com)
* [Vite](https://vite.dev)

## Preparation

1. [Install Bun](https://bun.sh/docs/installation)
2. Run `bun install` command in the application to install dependencies

## Scripts overview

All scripts are defined in [package.json](./package.json).

* `dev` - starts the application
* `build` - builds the application
* `preview` - starts the built application
* `analyze:bundle` - creates a static page with tree structure of the application's dependencies
* `check:types` - checks for TypeScript errors
* `check:eslint` - checks for ESLint errors
* `check:stylelint` - checks for Stylelint errors

To run a script, execute the following command in a command line: `bun run <script>`.

To stop a running script, press <kbd>Ctrl + C</kbd> (for Windows, maybe different in other operating systems) in the command line window the script is running in. Confirm the choice if prompted.
