import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar,
        private i18n: TranslateService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            fullname: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }


    isFieldInvalid(field: string) {
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.submitted)
        );
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.form.value.username, this.form.value.password, this.form.value.fullname)
            .then(
                data => {
                    this.i18n.get("register.snackbar-ok").toPromise().then((val)=>{
                        this.snackBar.open(val, undefined, {
                            duration: 2000
                        });
                        this.router.navigate(['/login']);
                    });
                },
                error => {
                    this.i18n.get("register.snackbar-failed").toPromise().then((val)=>{
                        this.snackBar.open(val + error, undefined, {
                            duration: 2000
                        });
                        this.loading = false;
                    });
            });
    }
}