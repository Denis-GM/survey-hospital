import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/api/account.service';
import { IRegisterAccount } from 'src/app/core/interfaces/account-interfaces';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  constructor(private accountService: AccountService) {}

  ngOnInit(): void { }

  items = [
    'Аналитик',
    'Администратор',
  ];
  
  regForm = new FormGroup({
    role: new FormControl( this.items[0], [ Validators.required ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    login: new FormControl('', [ Validators.required ]),
    password1: new FormControl('', [ Validators.required ]),
    password2: new FormControl('', [ Validators.required ]),
  });

  registerAccount() {
    const roleString: string = this.regForm.get('role')!.value!;
    const newAccount: IRegisterAccount = {
      login: this.regForm.get('login')!.value!,
      email: this.regForm.get('email')!.value!,
      role: roleString === 'Аналитик' ? 3 : 2,
      password: this.regForm.get('password1')!.value!,
      passwordConfirm: this.regForm.get('password2')!.value!,
    }
    console.log(newAccount)
    this.accountService.registerAccount(newAccount).subscribe(
      (data: any) => {
        console.log(data)
      },
      (err: any) => {
        console.log(err)
      }
    );
  }

  submit(): void {
    if(this.regForm.valid){
      console.log(this.regForm.value);
      this.registerAccount();
    }
    else {
      console.log('invalid')
    }
  }
}
