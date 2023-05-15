import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, map, combineLatest, switchMap, from } from 'rxjs';

import { User, UserPage, ServerUserPage, UserComparator, LoginComparator } from '../models/user';
import { UserFactory } from './user.factory';
import { userConfig } from '../config/user.config';
import { DummyHttpClientService } from './dummy-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private _userFactory: UserFactory,
    private _httpClient: DummyHttpClientService
  ) {
    this.requestUserPage();
  }

  private requestUserPage(): void {
    const currentUserPage$: Observable<UserPage> = from(this._httpClient.getUsers(userConfig.serverUrl))
      .pipe(
        map((serverUserPage: ServerUserPage) => this._userFactory.mapServerUserPageToUserPage(serverUserPage)),
        map((userPage: UserPage) => this.markPreviouslyBlockedUsers(userPage))
      );
    this._currentUserPage$ = combineLatest([currentUserPage$, this._currentUserFilter$, this._currentUserComparator$, this._changedUser$])
      .pipe(
        map(([currentUserPage, currentUserFilter, currentUserComparator, changedUser]) => this.mapUserPage(currentUserPage, currentUserFilter, currentUserComparator, changedUser)
        )
      );
  }

  private markPreviouslyBlockedUsers(userPage: UserPage): UserPage {
    userPage.users.forEach(user => {
      if (localStorage.getItem(user.id.toString())) {
        user.status = 'blocked';
      }
    });
    return userPage;
  }

  private _currentUserPage$!: Observable<UserPage>;
  private _currentUserFilter$: BehaviorSubject<Partial<User>> = new BehaviorSubject({});
  private _currentUserComparator$: BehaviorSubject<UserComparator> = new BehaviorSubject(new LoginComparator());
  private _changedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  private mapUserPage(
    userPage: UserPage,
    currentUserFilter: Partial<User>,
    currentUserComparator: UserComparator,
    changedUser: User | undefined): UserPage {
    let users = userPage.users;
    if (changedUser) {
      let userIndex = users.findIndex(user => changedUser.id === user.id);
      users[userIndex] = changedUser;
    }
    users = this.filterUsers(users, currentUserFilter)
      .sort(currentUserComparator.compare);
    userPage.users = users;
    return userPage;
  }

  private filterUsers(users: User[], currentUserFilter: Partial<User>): User[] {
    return users.filter(user => {
      if (currentUserFilter.login && user.login !== currentUserFilter.login) {
        return false;
      }
      if (currentUserFilter.email && user.email !== currentUserFilter.email) {
        return false;
      }
      if (currentUserFilter.phoneNumber && user.phoneNumber !== currentUserFilter.phoneNumber) {
        return false;
      }
      if (currentUserFilter.role && user.role !== currentUserFilter.role) {
        return false;
      }
      if (currentUserFilter.status && user.status !== currentUserFilter.status) {
        return false;
      }
      return true;
    });
  }

  get currentUserPage$(): Observable<UserPage> {
    return this._currentUserPage$;
  }

  selectUser(user: User): void {
    this._changedUser$.next(user);
  }

  sortUserList(userComparator: UserComparator): void {
    this._currentUserComparator$.next(userComparator);
  }

  filterUserList(userFilter: Partial<User>): void {
    this._currentUserFilter$.next(userFilter);
  }

  blockUsers(users: User[]): void {
    users.forEach(user => {
      user.toggleStatus();
      localStorage.setItem(user.id.toString(), 'blocked');
      this._changedUser$.next(user);
    });
  }

  unblockUsers(users: User[]): void {
    users.forEach(user => {
      user.toggleStatus();
      localStorage.removeItem(user.id.toString());
      this._changedUser$.next(user);
    });
  }
}
