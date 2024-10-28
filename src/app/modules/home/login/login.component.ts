import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    console.log('login', this.loginForm.value);
  }

  constructor(private formBuilder: FormBuilder) {}
}
