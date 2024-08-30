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

* Focus on front-end technologies mostly
* No dedicated server. [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) as a database. Though endpoints do exist (as well as their API documentation), their implementation depends on the context - the endpoints are called in tests and their responses are mocked with [MWS](https://mswjs.io/), while the database is updated in development and production builds. The name of application is so simple, because in order to distinguish them, it would be necessary to list all the technologies used, which would make the name very long. To compensate it, each application has a list of used technologies (see the [applications](#Applications) section below)
* Each implementation is called "application". The applications are deployed under one GitHub page with different sub-paths in URLs (for example, `/issue-tracker/applications/application-01`). For it to work, all the applications put their artifacts in a folder with the application's name (for example, `application-01`) inside `applications` folder, located at the top level of the repository
* Markdown support in text fields (issue description, comments, etc.)
* No query language support (like [JQL](https://www.atlassian.com/blog/jira/jql-the-most-flexible-way-to-search-jira-14)). A visual filter is provided instead
* Supported browsers:
  * Latest Google Chrome version
  * Latest Firefox version
* Responsiveness included
* Accessibility (a11y) included
* Light/dark theme included
* Internationalization (RTL) **possibly** included
* Right-to-left (RTL) **possibly** included
* Minimum to no animations

## Applications
