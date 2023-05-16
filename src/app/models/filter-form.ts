import { FormGroup, FormControl } from "@angular/forms";

export type FilterForm = FormGroup<{
    login: FormControl<string | undefined>,
    email: FormControl<string | undefined>,
    phoneNumber: FormControl<string | undefined>,
    creationDate: FormControl<Date | undefined>,
    updatedDate: FormControl<Date | undefined>,
    role: FormControl<'admin' | 'user' | undefined>,
    status: FormControl<'active' | 'blocked' | undefined>
}>;