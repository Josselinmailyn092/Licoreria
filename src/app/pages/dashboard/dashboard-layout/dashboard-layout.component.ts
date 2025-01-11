import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  encapsulation: ViewEncapsulation.Emulated, // Usa Shadow DOM o None si es necesario
})
export class DashboardLayoutComponent {
  isCollapsed = false;
}
