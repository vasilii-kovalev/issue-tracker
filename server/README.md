# Server

Status: in progress.

Technologies:

* [TypeScript](https://www.typescriptlang.org)
* [Fastify](https://fastify.dev)
* [MongoDB](https://www.mongodb.com)
* [Mongoose](https://mongoosejs.com)
* [Docker](https://www.docker.com)
* [Bun](https://bun.sh)

## Start/stop scripts

Before running the script, make sure the Docker is installed.

### Start

Run script `start`.

It does the following:

1. Pulls "mongo" Docker image
2. Creates a Docker container with name "issue-tracker-container"
3. Creates a volume with name "issue-tracker-volume" (for data persistence)
4. Run the container and attaches the volume to it
5. Starts a local server (via Bun in watch mode) on port 5000

### Stop

Stop the server in the same command line it was started ("Ctrl + C" for Window).

Then run script `stop:database`.

It does the following:

1. Stops the Docker container with name
2. Removes the container (because it won't be possible to create a container with the same name next time)
3. Removes all anonymous volumes (for some reason, when starting the container, a new anonymous volume is created and runs alongside with "issue-tracker-volume" one, though it doesn't contain any data)
