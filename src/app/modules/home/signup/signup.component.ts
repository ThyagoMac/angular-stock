import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    console.log('Signup', this.signupForm.value);
  }

  constructor(private formBuilder: FormBuilder) {}
}
