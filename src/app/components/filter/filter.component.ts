import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { FilterForm } from 'src/app/models/filter-form';
import { FilterFormStateMatcher } from 'src/app/models/entry-form-state-matcher';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filterFormStateMatcher = new FilterFormStateMatcher();
  startDate = new Date(2023, 4, 13);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, formBuilder: FormBuilder) {
    iconRegistry
      .addSvgIcon('calendar', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/calendar.svg'))
      .addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/cancel.svg'));
    this.filterForm = formBuilder.group({
      login: [null as string | null, [Validators.pattern('[a-zA-Z]+')]],
      email: [null as string | null, [Validators.email]],
      phoneNumber: [null as string | null, [Validators.pattern('[- +()0-9]{11,11}')]],
      creationDate: [null as string | null],
      updatedDate: [null as string | null],
      role: [null as 'admin' | 'user' | null, [Validators.pattern('(admin|user)')]],
      status: [null as 'active' | 'blocked' | null, [Validators.pattern('(active|blocked)')]]
    });
  }

  filterForm: FilterForm;
}
