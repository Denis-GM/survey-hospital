import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/api/account.service';
import { IRegisterAccount } from 'src/app/core/interfaces/account.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  protected message: string = ''
  protected regForm!: FormGroup;

  items = [ 'Аналитик', 'Администратор' ];

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.regForm = new FormGroup({
      role: new FormControl( this.items[0], [ Validators.required ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      login: new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      password1: new FormControl('', [ Validators.required, Validators.minLength(12) ]),
      password2: new FormControl('', [ Validators.required, Validators.minLength(12) ]),
    });
  }

  get email() {
    return this.regForm.get('email')!;
  }

  get login() {
    return this.regForm.get('login')!;
  }

  get password1() {
    return this.regForm.get('password1')!;
  }

  get password2() {
    return this.regForm.get('password2')!;
  }

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
    this.accountService.register(newAccount).subscribe(
      (data: any) => {
        this.router.navigate(['/account/login']);
      },
      (err: any) => {
        alert('Ошибка заполнения формы')
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
