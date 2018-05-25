import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


class PersonFormValues {
    personName: string | null = null;
    stateName: string | null = null;
}

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
    validPersonNames$: Observable<String[]>;
    validStateNames$: Observable<String[]>;

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.generateForm();

        this.validPersonNames$ = of(['John', 'Jim', 'Jane']);
        this.validStateNames$ = of(['FL', 'OH', 'CA']);
    }

    private generateForm() {
        const formGroup = this.fb.group({
            'personName': ['', [Validators.required]],
            'stateName': ['', [Validators.required]],
        });
        formGroup.setValue(new PersonFormValues());
        this.form = formGroup;
    }
}