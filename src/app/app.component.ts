import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend_invoice';


  isCollapsed = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    const sidebar = document.getElementById('sidebar');
    if (this.isCollapsed) {
      sidebar?.classList.add('collapsed');
    } else {
      sidebar?.classList.remove('collapsed');
    }
  }
}