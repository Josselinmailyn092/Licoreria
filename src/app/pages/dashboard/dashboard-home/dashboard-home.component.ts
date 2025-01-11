import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {
  isCollapsed = false;

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/dashboard/${route}`]);
  }
}
