import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '@model';
import { AuthenticationService } from '@service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({ templateUrl: 'profile.component.html' })
export class ProfileComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;

    form: UntypedFormGroup;
    private formSubmitAttempt: boolean;

    constructor(
        private fb: UntypedFormBuilder,
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar,
        private i18n: TranslateService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
            if(this.form && this.currentUser != null) {
                this.form.controls.fullname.setValue(this.currentUser.fullname);
            }
        });
    }

    ngOnInit() {
        this.form = this.fb.group({
            fullname: ['', Validators.required],
            password: ['']
        });
        if(this.currentUser) {
            this.form.controls.fullname.setValue(this.currentUser.fullname);
        }
    }

    ngOnDestroy() {
    }

    isFieldInvalid(field: string) {
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

    onSubmit() {
        if (this.form.valid) {
            this.authenticationService.updateAccount(this.form.value.fullname,
                this.form.value.password != "" ? this.form.value.password : undefined)
                .then(
                    data => {
                        this.i18n.get("profile.snackbar-updated").toPromise().then((val)=>{
                            this.snackBar.open(val, undefined, {
                                duration: 2000
                            });
                        });
                    },
                    error => {
                        this.i18n.get("profile.snackbar-updatefailed").toPromise().then((val)=>{
                            this.snackBar.open(val + error, undefined, {
                                duration: 2000
                            });
                            this.formSubmitAttempt = false;
                        });
                    });
        }
        this.formSubmitAttempt = true;
    }
}