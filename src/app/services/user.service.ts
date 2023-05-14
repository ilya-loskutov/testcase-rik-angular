import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, map, combineLatest } from 'rxjs';

import { User, UserPage, ServerUserPage, UserComparator, LoginComparator } from '../models/user';
import { UserFactory } from './user.factory';
import { userConfig } from '../config/user.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private _userFactory: UserFactory,
    private _httpClient: HttpClient
  ) {
    this.requestUserPage();
  }

  private requestUserPage(): void {
    const currentUserPage$: Observable<UserPage> = this._httpClient.get<ServerUserPage>(userConfig.serverUrl)
      .pipe(
        map(this._userFactory.mapServerUserPageToUserPage)
      );
    this._currentUserPage$ = combineLatest([currentUserPage$, this._currentUserFilter$, this._currentUserComparator$])
      .pipe(
        map(this.mapUserPage)
      );
  }

  private _currentUserPage$!: Observable<UserPage>;
  private _currentUserFilter$: BehaviorSubject<Partial<User>> = new BehaviorSubject({});
  private _currentUserComparator$: BehaviorSubject<UserComparator> = new BehaviorSubject(new LoginComparator());

  private mapUserPage(
    [userPage, currentUserFilter, currentUserComparator]: [UserPage, Partial<User>, UserComparator]
  ): UserPage {
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
}