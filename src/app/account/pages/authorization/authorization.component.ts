import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from 'src/app/core/api/account.service';
import { ILoginAccount } from 'src/app/core/interfaces/account-interfaces';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {

  constructor(private accountService: AccountService, private cookieService: CookieService) {}

  loginForm = new FormGroup({
    login: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ]),
  });

  loginAccount() {
    const account: ILoginAccount = {
      login: this.loginForm.get('login')!.value!,
      password: this.loginForm.get('password')!.value!,
    }
    this.accountService.loginAccount(account).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('auth-token', data.token);
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  submit(): void {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginAccount();
    }
    else {
      console.log('invalid');
    }
  }
}
