# Models

This document contains information about the project's models.

## User

### Description

User of the system.

### Properties

#### `displayedName`

User's name. Displayed in tickets, profile, etc.

* **Type**: `string`
* **Required**: true
* **Example**: `John Doe`

#### `email`

User's email. Used for login and authentication.

* **Type**: `string`
* **Required**: true
* **Example**: `john.doe@issue-tracker.com`

#### `id`

User's ID. Used for any operations on a user, like update, delete, etc.

* **Type**: `string`
* **Required**: true
* **Example**: `66e45ecebc42d1f7afb1059e`

#### `password`

A hashed version of user's password.

* **Type**: `string`
* **Required**: true

#### `roles`

A list of user's roles. The roles are described in the [Permissions document](./permissions.md).

* **Type**: `Array<string>`
* **Required**: true
* **Example**: `["admin"]`
