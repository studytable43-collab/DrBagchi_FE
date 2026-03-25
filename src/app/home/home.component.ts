import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 isMenuOpen = false;

 constructor(private router:Router)
 {

 }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

goToLogin(): void
{
   this.router.navigate(['/login']);
}
goToSignup(): void {
  this.router.navigate(['/signup']);
}

  
}
