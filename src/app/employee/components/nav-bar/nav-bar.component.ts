import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/api/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router, private accountService: AccountService) {}

  logout() {
    this.accountService.logout()
    // localStorage.setItem('auth-token', '')
    // this.router.navigate(['/employee/account/login'])
  }
}
