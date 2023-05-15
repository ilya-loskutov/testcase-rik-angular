export class User {
    constructor(
        public readonly id: number,
        public readonly login: string,
        public readonly email: string,
        public readonly phoneNumber: number,
        public readonly creationDate: Date,
        public readonly updatedDate: Date,
        public readonly role: 'user' | 'admin',
        public status: 'active' | 'blocked',
        public readonly hasDigitalSignature: boolean,
        public isSelected: boolean
    ) { }

    toggleStatus(): void {
        this.status === 'active' ?
            this.status = 'blocked' :
            this.status = 'active';
    }
}

export class UserPage {
    constructor(
        public offset: number,
        public total: number,
        public users: User[]
    ) { }
}

export abstract class UserComparator {
    abstract compare(userA: User, userB: User): 1 | -1;
}

export class LoginComparator extends UserComparator {
    compare(userA: User, userB: User): 1 | -1 {
        return userA.login > userB.login ? 1 : -1;
    }
}

export class RoleComparator extends UserComparator {
    compare(userA: User, userB: User): 1 | -1 {
        return userA.role === 'admin' ? -1 : 1;
    }
}

export class StatusComparator extends UserComparator {
    compare(userA: User, userB: User): 1 | -1 {
        return userA.status === 'blocked' ? 1 : -1;
    }
}

export type ServerUser = {
    readonly id: number,
    readonly name: string,
    readonly email: string,
    readonly phone: number,
    readonly create_at: number,
    readonly update_at: number,
}

export type ServerUserData = {
    readonly user_id: number,
    readonly is_admin: boolean,
    readonly is_ecp: boolean,
    readonly status: 'ACTIVE' | 'BLOCKED'
}

export type ServerUserPage = {
    readonly page: {
        readonly total: number,
        readonly current: number,
        readonly size: number
    },
    readonly users: ServerUser[],
    readonly data: ServerUserData[]
}