import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from 'src/app/core/api/account.service';
import { ILoginAccount } from 'src/app/core/interfaces/account-interfaces';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit{
    protected loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private accountService: AccountService, 
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            login: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ]),
        });
    }

    login() {
        const account: ILoginAccount = {
            login: this.loginForm.get('login')!.value!,
            password: this.loginForm.get('password')!.value!,
        }
        this.accountService.login(account).subscribe(
            (data: any) => {
                console.log(data);
                // localStorage.setItem('user', JSON.stringify(data));
                // console.log(data);
                // localStorage.setItem('auth-token', data.token);
                this.router.navigate(['/employee/main/surveys']);

                // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/patient';
                // this.router.navigateByUrl(returnUrl);
            },
            (err: any) => {
                console.log(err)
            }
        );
    }

    submit(): void {
        if(this.loginForm.valid) {
            this.loading = true;
            console.log(this.loginForm.value);
            this.login();
        }
        else {
            console.log('invalid');
        }
    }
}
