import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLogin = true;

  switchIsLogin(val: boolean) {
    this.isLogin = val;
  }
}
