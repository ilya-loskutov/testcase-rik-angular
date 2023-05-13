import { FormGroup, FormControl } from "@angular/forms";

export type FilterForm = FormGroup<{
    login: FormControl<string | null>,
    email: FormControl<string | null>,
    phoneNumber: FormControl<string | null>,
    creationDate: FormControl<string | null>,
    updatedDate: FormControl<string | null>,
    role: FormControl<'admin' | 'user' | null>,
    status: FormControl<'active' | 'blocked' | null>
}>;