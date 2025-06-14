# Server

Status: in progress.

## Technologies

* [Bun](https://bun.sh)
* [Fastify](https://fastify.dev)
* [Prisma](https://www.prisma.io)
* [SQLite](https://www.sqlite.org)
* [TypeScript](https://www.typescriptlang.org)

## Scripts overview

All scripts are defined in [package.json](./package.json).

* `prisma:generate` - alias for [Prisma's `generate` script](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#generate). Creates `PrismaClient` and types according to the [Prisma's schema](./prisma/schema.prisma)
* `prisma:update` - alias for [Prisma's `db push` script](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#db-push). Creates database (and tables in it) or updates it after changes in the [Prisma's schema](./prisma/schema.prisma)
* `prisma:seed` - alias for [Prisma's `db seed` script](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#db-seed). Removes existing data in the database and populates it with mock data using the [seed script](./src/db/seed.ts)
* `prisma:studio` - alias for [Prisma's `studio` script](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#studio-1). Opens [Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio) in the browser
* `start` - starts a local HTTP server and connects to the local database
* `check:types` - checks for TypeScript errors
* `check:eslint` - checks for ESLint errors

To run a script, execute the following command in a command line: `bun run <script>`.

To stop a running script, press <kbd>Ctrl + C</kbd> (for Windows, maybe different in other operating systems) in the command line window the script is running in. Confirm the choice if prompted by entering <kbd>y</kbd> (yes).

### Preparation

1. [Install Bun](https://bun.sh/docs/installation)
2. Run `bun install` command in the application to install dependencies
3. Run `prisma:generate` script
4. Run `prisma:update` script
5. Run `prisma:seed` script (if you need to create the mock data for the first time or replace the existing data)

## Starting the server

Run the `start` script.

It does the following:

1. Starts a local server (via Bun in watch mode with hot reloading) on <http://localhost:5000>
2. Connects to the local database

## Stopping the server

Stop the server in the same command line it was started (<kbd>Ctrl + C</kbd> for Windows). Confirm the choice if prompted by entering <kbd>y</kbd> (yes).

## Swagger

After starting the server, visit <http://localhost:5000/swagger>.

## Folder structure

* [index.ts](./index.ts) - the application's entry points. It contains the following:
  * Server initialization and launch
  * Server plugins registering
  * OpenAPI schemas registering
  * Routes registering
  * Connection to the database
* [src](./src) folder:
  * [db](./src/db) - Prisma-related code
    * [prisma](./src/db/prisma) - appears after running `prisma:generate` script. Contains Prisma Client and types according to the [Prisma's schema](./prisma/schema.prisma)
    * [client](./src/db/client.ts) - creates, configures and exports a Prisma client
    * [seed](./src/db/seed.ts) - a seed script, that populates the database with mock data. Used in `prisma:seed` script
  * [models](./src/models) - code, related to models of the project. Main models are described in the ["Models" document](../documentation/models.md), but the folder may also contain other "utility" models (like auth, errors, dates and so on) to create a place for related code. Each model may contain:
    * Constants (`constants.ts`)
    * Types (`types.ts`)
    * Utility functions (`utilities/*`)
    * Selectors (`selectors`) - contains objects, that are used in Prisma models to select data (for example, in `select` field). Their usage prevents inconsistency when selecting data for similar cases
    * Routes (`routes.ts`) - route definitions
    * OpenAPI schemas (`schemas.ts`) - used in route definitions
    * Middleware (`middleware/*`) - used in route definitions
  * [utilities](./src/utilities) - global utility functions
* [documentation](./documentation) folder - the application-specific documentation
