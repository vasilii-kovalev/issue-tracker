# Models

This document contains information about the project's models.

## Permission

### Description

User's permission. Permissions are described in the ["Role-based permission control" document](./role-based-permission-control.md#permissions).

### Properties

#### `createdDate`

Permission's creation date.

* **Type**: `string`
* **Required**: Yes
* **Unique**: No
* **Format**: Timestamp
* **Example**: `2024-01-01T09:00:00.000Z`

#### `id`

Permission's ID.

* **Type**: `string`
* **Required**: Yes
* **Unique**: Yes
* **Format**: `resource:action:scope` ([permission format](./role-based-permission-control.md#permission-format))
* **Example**: `USER:CREATE:ANY`

#### `updatedDate`

Permission's last update date.

* **Type**: `string`
* **Required**: Yes
* **Unique**: No
* **Format**: Timestamp
* **Example**: `2024-01-01T09:00:00.000Z`

### Relations with other models

* [User](#user) - permission may be assigned to multiple users
* [Role](#role) - permission may be included in multiple roles

## Role

### Description

User' role. Roles are described in the ["Role-based permission control" document](./role-based-permission-control.md#roles).

### Properties

#### `createdDate`

Role's creation date.

* **Type**: `string`
* **Required**: Yes
* **Unique**: No
* **Format**: Timestamp
* **Example**: `2024-01-01T09:00:00.000Z`

#### `id`

Role's ID.

* **Type**: `string`
* **Required**: Yes
* **Unique**: Yes
* **Example**: `cm441ynf30001v2mk6ka140x4`

#### `updatedDate`

Role's last update date.

* **Type**: `string`
* **Required**: Yes
* **Unique**: No
* **Format**: Timestamp
* **Example**: `2024-01-01T09:00:00.000Z`

### Relations with other models

* [User](#user) - role may assigned to multiple users
* [Permission](#permission) - role may include multiple permissions

## User

### Description

User of the system.

### Properties

#### `createdDate`

User's creation date.

* **Type**: `string`
* **Required**: Yes
* **Unique**: No
* **Format**: Timestamp
* **Example**: `2024-01-01T09:00:00.000Z`

#### `email`

User's email. Used for login and authentication.

* **Type**: `string`
* **Required**: Yes
* **Unique**: Yes
* **Format**: Email
* **Example**: `john.doe@issue-tracker.com`

#### `id`

User's ID.

* **Type**: `string`
* **Required**: Yes
* **Unique**: Yes
* **Example**: `cm441ynf30001v2mk6ka140x4`

#### `name`

User's name.

* **Type**: `string`
* **Required**: Yes
* **Unique**: Yes
* **Min length**: 1
* **Max length**: 100
* **Example**: `John Doe`

#### `password`

A hashed version of user's password.

* **Type**: `string`
* **Required**: Yes
* **Unique**: No
* **Min length**: 3

#### `updatedDate`

User's last update date.

* **Type**: `string`
* **Required**: Yes
* **Unique**: No
* **Format**: Timestamp
* **Example**: `2024-01-01T09:00:00.000Z`

### Relations with other models

* [Role](#role) - user may have multiple roles
* [Permission](#permission) - user may have multiple permissions
