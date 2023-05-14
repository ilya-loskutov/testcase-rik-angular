import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

export class FilterFormStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl): boolean {
        return control.invalid && control.dirty;
    }
}