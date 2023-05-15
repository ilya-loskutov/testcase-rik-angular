import { Component } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { FilterForm } from 'src/app/models/filter-form';
import { FilterFormStateMatcher } from 'src/app/models/filter-form-state-matcher';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filterFormStateMatcher = new FilterFormStateMatcher();
  startDate = new Date(2023, 4, 13);

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    formBuilder: FormBuilder,
    private userService: UserService
  ) {
    iconRegistry
      .addSvgIcon('calendar', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/calendar.svg'))
      .addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/cancel.svg'));
    this.filterForm = formBuilder.nonNullable.group({
      login: [undefined as string | undefined, [Validators.pattern('[a-zA-Z]+')]],
      email: [undefined as string | undefined, [Validators.email]],
      phoneNumber: [undefined as number | undefined, [Validators.pattern('[- +()0-9]{11,11}')]],
      creationDate: [undefined as undefined | Date],
      updatedDate: [undefined as undefined | Date],
      role: [undefined as 'admin' | 'user' | undefined, [Validators.pattern('(admin|user)')]],
      status: [undefined as 'active' | 'blocked' | undefined, [Validators.pattern('(active|blocked)')]]
    });
  }

  filterForm: FilterForm;

  onFilterFormSubmit(): void {
    if (this.filterForm.valid) {
      console.log(this.filterForm.value)
      this.userService.filterUserList(this.filterForm.value);
    }
  }
}