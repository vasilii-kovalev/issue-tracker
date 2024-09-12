# Issue tracker

## Introduction

This repository contains an issue tracker application, implemented with different technical stacks.

I use it to learn and experiment with different technologies, which I think shine better in complex projects rather than simple ones (like TODO applications). And issue tracker seems a good type of application for it, because it requires:

* Multiple pages
* Lazy data loading
* Complex models and relations between them
* Complex permissions model
* Authorization
* Customization of almost everything on multiple levels (application instance, project, user)
* UI components of different complexity: text, buttons, forms, dropdown, charts, tables, etc.
* Form validation

## Features

* Each implementation is called "application"
* Focus on front-end technologies mostly
* Minimalistic server with MongoDB database
* No deployed preview. Since there will be no focus on the server, its optimization and security, the server will not be deployed anywhere, which means the applications can only be observed locally - run the [server](#server) and the application you need
  * I tried to use IndexedDB (using [Dexie](https://dexie.org)) to avoid relying on a dedicated server and serve the preview of the applications via GitHub Pages, but realized that too much code will be shipped alongside the "front-end" part, slowing it down and making the code harder to maintain
* Markdown support in text fields (issue description, comments, etc.)
* No query language support (like [JQL](https://www.atlassian.com/blog/jira/jql-the-most-flexible-way-to-search-jira-14)). A visual filter is provided instead
* Supported browsers:
  * Latest Google Chrome version
  * Latest Firefox version
* Tests included
* Responsiveness included
* Accessibility (a11y) included
* Light/dark theme included
* Internationalization **possibly** included
* Right-to-left (RTL) **possibly** included
* Minimum to no animations

## Applications

### Server

Status: in progress.

[Link to source code](https://github.com/vasilii-kovalev/issue-tracker/tree/main/server)

Technologies:

* [TypeScript](https://www.typescriptlang.org)
* [Fastify](https://fastify.dev)
* [MongoDB](https://www.mongodb.com)
* [Mongoose](https://mongoosejs.com)
* [Docker](https://www.docker.com)
* [Bun](https://bun.sh)

### Application 01

Status: in progress.

[Link to source code](https://github.com/vasilii-kovalev/issue-tracker/tree/main/application-01)

Technologies:

* [TypeScript](https://www.typescriptlang.org)
* [React](https://react.dev)
* [React Router DOM](https://v5.reactrouter.com/web)
* [UUI](https://uui.epam.com)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [Bun](https://bun.sh)
