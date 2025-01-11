import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  constructor(private router: Router) {}
  isDashboardRoute(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
}
