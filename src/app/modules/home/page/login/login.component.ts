import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserLoginInterface } from 'src/app/models/interfaces/user';
import { UserService } from 'src/app/services/user/user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() switchIsLogin = new EventEmitter<void>();

  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  onSubmitHandler(): void {
    if (this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as UserLoginInterface)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();

              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `Welcome ${response?.name}...`,
              });
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
