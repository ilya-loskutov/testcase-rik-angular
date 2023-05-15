import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Observable } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { User, UserPage } from 'src/app/models/user';

@Component({
  selector: 'app-account-actions',
  templateUrl: './account-actions.component.html',
  styleUrls: ['./account-actions.component.scss']
})
export class AccountActionsComponent {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    iconRegistry.addSvgIcon('arrow-left', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/arrow-left.svg'));
    this.currentUserPage$ = userService.currentUserPage$;
  }

  currentUserPage$: Observable<UserPage>;

  unBlockSelectedUsers(users: User[]): void {
    this.userService.unblockUsers(users.filter(user => user.isSelected));
  }

  blockSelectedUsers(users: User[]): void {
    this.userService.blockUsers(users.filter(user => user.isSelected));
  }
}
