import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
              this.loginForm.reset();
              console.log('logou: ', response);
            }
          },
          error: (err) => console.log('error: ', err),
        });
    }
    console.log('login', this.loginForm.value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
}
