import { Injectable } from '@angular/core';

import { ServerUserPage, UserPage, UserComparator, ServerUser, ServerUserData, User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserFactory {
    mapServerUserPageToUserPage(serverUserPage: ServerUserPage): UserPage {
        const users = serverUserPage.users
            .map(serverUser => this.mapServerUserToUser(
                serverUser,
                serverUserPage.data.find(serverUserData => serverUserData.user_id === serverUser.id) as ServerUserData)
            )
        return new UserPage(
            this.calculateUserListOffset(serverUserPage.page.size, serverUserPage.page.current),
            this.calculateUserTotalNumber(serverUserPage.page.size, serverUserPage.page.total),
            users
        );
    }

    private mapServerUserToUser(serverUser: ServerUser, serverUserData: ServerUserData): User {
        return new User(
            serverUser.id,
            serverUser.name,
            serverUser.email,
            serverUser.phone,
            new Date(serverUser.create_at),
            new Date(serverUser.update_at),
            serverUserData.is_admin ? 'admin' : 'user',
            serverUserData.status === 'ACTIVE' ? 'active' : 'blocked',
            serverUserData.is_ecp,
            false
        );
    }

    private calculateUserListOffset(pageSize: number, currentPageNumber: number): number {
        return (currentPageNumber - 1) * pageSize;
    }

    private calculateUserTotalNumber(pageSize: number, totalPageNumber: number): number {
        return pageSize * totalPageNumber; // may be less
    }

    createUserPage(offset: number, total: number, users: User[]): UserPage {
        return new UserPage(offset, total, users);
    }
}