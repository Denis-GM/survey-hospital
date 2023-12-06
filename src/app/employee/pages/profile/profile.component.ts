import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/api/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  protected account: any = {};

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    this.accountService.getAccount().subscribe(
      (data: any) => {
        this.account = data;
        console.log(this.account);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }
}
