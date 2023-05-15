import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { UserService } from 'src/app/services/user.service';
import { UserPage, User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  constructor(
    private userService: UserService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.currentUserPage$ = userService.currentUserPage$;
    iconRegistry.addSvgIcon('ic_setting', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ic_setting.svg'))
      .addSvgIcon('success', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/success.svg'))
      .addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/cancel.svg'));
  }

  currentUserPage$: Observable<UserPage>;

  getFirstUserNumber(currentUserPage: UserPage): number {
    return currentUserPage.users.length === 0 ?
      0 :
      currentUserPage.offset + 1;
  }

  getLastUserNumber(currentUserPage: UserPage): number {
    return currentUserPage.users.length === 0 ?
      0 :
      currentUserPage.offset + currentUserPage.users.length;
  }

  getTotalUserNumber(currentUserPage: UserPage): number {
    return 135;
  }

  getSelectedUsersNumber(users: User[]): number {
    return users.filter(user => user.isSelected).length;
  }
}
