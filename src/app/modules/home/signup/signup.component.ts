import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
          next: (response) => {
            if (response) {
              this.login();
            }
          },
          error: (err) => console.log('error: ', err),
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
              console.log('logou: ', response);
              this.signupForm.reset();
            }
          },
          error: (err) => console.log('error: ', err),
        });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
}
