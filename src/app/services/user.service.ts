import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, map, combineLatest, from } from 'rxjs';

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
    this._currentUserPage$ = combineLatest([currentUserPage$, this._currentUserFilter$, this._currentUserComparator$])
      .pipe(
        map(([currentUserPage, currentUserFilter, currentUserComparator]) => this.mapUserPage(currentUserPage, currentUserFilter, currentUserComparator)
        )
      )
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

  private mapUserPage(userPage: UserPage, currentUserFilter: Partial<User>, currentUserComparator: UserComparator): UserPage {
    let users = userPage.users;
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
      return true;
    });
  }

  get currentUserPage$(): Observable<UserPage> {
    return this._currentUserPage$;
  }

  sortUserList(userComparator: UserComparator): void {
    this._currentUserComparator$.next(userComparator);
  }

  filterUserList(userFilter: Partial<User>): void {
    this._currentUserFilter$.next(userFilter);
  }

  blockUser(user: User): void {
    user.toggleStatus();
    localStorage.setItem(user.id.toString(), 'blocked');
  }

  unblockUser(user: User): void {
    user.toggleStatus();
    localStorage.removeItem(user.id.toString());
  }
}
