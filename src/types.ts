export interface principalData {
	data: {
		user: User;
	};
}

export interface User {
	userId: number;
	email: string;
	username: string;
	profileImg: string;
	userRoles: UserRole[];
}

export interface UserRole {
	userId: number;
	roleId: number;
	userRoleId: number;
	role: Role;
}

export interface Role {
	roleId: number;
	roleName: string;
}

export interface Metadata {
	Model: string;
	latitude: number;
	longitude: number;
}