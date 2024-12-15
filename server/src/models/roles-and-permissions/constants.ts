enum Role {
	ADMIN = "ADMIN",
	USER = "USER",
}

enum Resource {
	USER = "USER",
}

enum Action {
	CREATE = "CREATE",
	DELETE = "DELETE",
	READ = "READ",
	UPDATE = "UPDATE",
}

enum Scope {
	ANY = "ANY",
	OWN = "OWN",
}

export {
	Action,
	Resource,
	Role,
	Scope,
};
