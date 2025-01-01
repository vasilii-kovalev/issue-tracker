# Role-based permission control

This document contains information about control over user's actions using permissions.

## Resources

Resource is an entity regulated by the user's permissions.

### Available resources

* `USER`

This list is constant and is not supposed to be change via UI or endpoints.

## Permissions

Permission is a string representing a user's available actions.

### Permission format

Format of permissions is `resource:action:scope`, where

* `resource` - the resource from the [available resources list](#available-resources)
* `action` - a CRUD (create, read, update, delete) operation a user can perform on the resource
* `scope` - scope of the action, that can be performed on the resource. Available values:
  * `OWN` - user can perform the action only on own instances of the resource (for example, update only own profile)
  * `ANY` - user can perform the action on any instances of the resource

### Available permissions

* `USER:CREATE:ANY`
* `USER:DELETE:ANY`
* `USER:UPDATE:ANY`
* `USER:UPDATE:OWN`

This list is constant and is not supposed to be change via UI or endpoints.

Other permissions are assumed/granted by default, like reading resources, so we don't need records in the database for them. When accessing resources with such default permissions, only the user's authorization is checked.

## Roles

Role is combination of several permissions.

### Available roles

* `USER`
* `ADMIN`

## Permission-to-role mapping table

| Permission/Role   | `USER` | `ADMIN` |
| :---------------- | :----: | :-----: |
| `USER:CREATE:ANY` |        | ✓       |
| `USER:DELETE:ANY` |        | ✓       |
| `USER:UPDATE:ANY` |        | ✓       |
| `USER:UPDATE:OWN` | ✓      | ✓       |

This mapping is constant and is not supposed to be change via UI or endpoints.

## User actions-to-permission mapping table

| User action                                   | Permissions       |
| :-------------------------------------------- | :---------------- |
| View own profile (including roles)            | Any               |
| View someone's else profile (including roles) | Any               |
| Update own profile                            | `USER:UPDATE:OWN` |
| Update someone's else profile                 | `USER:UPDATE:ANY` |
| Create a profile                              | `USER:CREATE:ANY` |
| Delete a profile (including own)              | `USER:DELETE:ANY` |

This mapping is constant and is not supposed to be change via UI or endpoints.
