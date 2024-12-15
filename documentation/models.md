# Models

This document contains information about the project's models.

## User

### Description

User of the system.

### Properties

#### `email`

User's email. Used for login and authentication.

* **Type**: `string`
* **Required**: true
* **Example**: `john.doe@issue-tracker.com`

#### `id`

User's ID. Used for any operations on a user, like update, delete, etc.

* **Type**: `string`
* **Required**: true
* **Example**: `cm441ynf30001v2mk6ka140x4`

#### `name`

User's name. Displayed in tickets, profile, etc.

* **Type**: `string`
* **Required**: true
* **Min length**: 1
* **Max length**: 100
* **Example**: `John Doe`

#### `password`

A hashed version of user's password.

* **Type**: `string`
* **Required**: true
* **Min length**: 3

#### `roles`

User's roles. The roles are described in the ["Role-based permission control" document](./role-based-permission-control.md).

* **Type**: `Array<string>`
* **Required**: true
* **Example**: `USER`
