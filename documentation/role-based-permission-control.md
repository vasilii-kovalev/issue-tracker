# Role-based permission control

This document contains information about control over user's actions using permissions.

## Resources

Resource is an entity regulated by the user's permissions.

### Available resources

* `USER`

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

Other permissions are assumed/granted by default, like reading resources, so we don't need records in the database for them. When accessing resources with such default permissions, only the user's authorization is checked.

## Roles

Role is combination of several permissions.

### Available roles

* `USER`
* `ADMIN`

### Permission-to-role mapping table

| Permission/Role   | `USER` | `ADMIN` |
| ----------------- | :----: | :-----: |
| `USER:CREATE:ANY` |        | ✓       |
| `USER:DELETE:ANY` |        | ✓       |
| `USER:UPDATE:ANY` |        | ✓       |
| `USER:UPDATE:OWN` | ✓      | ✓       |
