# Server

Status: in progress.

Technologies:

* [TypeScript](https://www.typescriptlang.org)
* [Fastify](https://fastify.dev)
* [MongoDB](https://www.mongodb.com)
* [Mongoose](https://mongoosejs.com)
* [Docker](https://www.docker.com)
* [Bun](https://bun.sh)

## Preparation

1. [Install Docker](https://docs.docker.com/desktop)
2. [Install Bun](https://bun.sh/docs/installation)
3. Run `bun install` command in the application to install dependencies
4. Start Docker

## Scripts overview

All scripts are defined in [package.json](./package.json).

* `start` - starts a Docker container with database and the server (see a more detailed description in the next section)
* `stop:database` - stops the Docker container with database (see a more detailed description in the next section)
* `check:types` - checks for TypeScript errors
* `check:eslint` - checks for ESLint errors

Other scrips are a part of `start` and `stop:database` scripts and have self-explanatory names.

To run a script, execute the following command in a command line: `bun run <script>`.

To stop a running script, press <kbd>Ctrl + C</kbd> (for Windows, maybe different in other operating systems) in the command line window the script is running in. Confirm the choice if prompted.

## Start/stop the application

Before running the script, make sure the Docker is installed.

### Start

Run script `start`.

It does the following:

1. Pulls "mongo" Docker image
2. Creates a Docker container with name "issue-tracker-container"
3. Creates a volume with name "issue-tracker-volume" (for data persistence)
4. Run the container and attaches the volume to it
5. Starts a local server (via Bun in watch mode) on <http://localhost:5000>

### Stop

Stop the server in the same command line it was started (<kbd>Ctrl + C</kbd> for Windows).

Then run script `stop:database`.

It does the following:

1. Stops the Docker container with name
2. Removes the container (because it won't be possible to create a container with the same name next time)
3. Removes all anonymous volumes (for some reason, when starting the container, a new anonymous volume is created and runs alongside with "issue-tracker-volume" one, though it doesn't contain any data)

## Swagger

After starting the server (see above), visit <http://localhost:5000/swagger>.

## Mock data

When a collection doesn't have documents in it, several documents are created automatically in that collection on the server's start or reload.

Check `populateData` function's call in [index.ts](./index.ts) file to learn more.
