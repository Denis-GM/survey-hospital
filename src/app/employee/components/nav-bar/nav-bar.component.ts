import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/api/account.service';
import { IUser } from 'src/app/core/interfaces/IUser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  protected role: number;
  constructor(private router: Router, private accountService: AccountService) {
    this.role = (localStorage.getItem('role') || 3) as number;
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout()
  }
}
