import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: ['./toolbar-navigation.component.scss'],
})
export class ToolbarNavigationComponent {
  constructor(private cookie: CookieService, private router: Router) {}

  handleLogout(): void {
    this.cookie.delete('USER_TOKEN');
    void this.router.navigate(['/home']);
  }
}
