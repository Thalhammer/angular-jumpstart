import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/service'
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  private formSubmitAttempt: boolean;
  loading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router, 
    private snackBar: MatSnackBar,
    private i18n: TranslateService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authenticationService.login(this.form.value.userName, this.form.value.password)
        .then(
          data => {
            this.i18n.get("login.snackbar-ok").toPromise().then((val)=>{
              this.snackBar.open(val, undefined, {
                duration: 2000
              });
              this.router.navigate(['/']);
            });
          },
          error => {
            this.i18n.get("login.snackbar-failed").toPromise().then((val)=>{
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