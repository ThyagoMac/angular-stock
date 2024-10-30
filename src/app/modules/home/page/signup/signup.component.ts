import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import {
  UserLoginInterface,
  UserSignupInterface,
} from 'src/app/models/interfaces/user';
import { UserService } from 'src/app/services/user/user.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @Output() switchIsLogin = new EventEmitter<void>();

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  onSubmitHandler(): void {
    if (this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as UserSignupInterface)
        .subscribe({
          next: () => {
            this.login();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Accound ${this.signupForm.value.name} created. Redirecting to home page...`,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${err?.error?.error}`,
            });
          },
        });
    }
  }

  login(): void {
    if (this.signupForm.valid) {
      this.userService
        .authUser(this.signupForm.value as UserLoginInterface)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.signupForm.reset();
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${err?.error?.error}`,
            });
          },
        });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}
}
