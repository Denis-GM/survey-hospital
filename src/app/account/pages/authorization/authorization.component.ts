import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/api/account.service';
import { ILoginAccount } from 'src/app/core/interfaces/account.interface';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit{
    protected loginForm!: FormGroup;
    protected loading = false;
    protected submitted = false;
    protected error = '';

    constructor(
        private accountService: AccountService, 
        private router: Router,
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
                this.router.navigate(['/main/surveys']);
            },
            (err: any) => {
                console.log(err)
            }
        );
    }

    submit(): void {
        if(this.loginForm.valid) {
            this.loading = true;
            this.login();
        }
        else {
            console.log('invalid');
        }
    }
}
