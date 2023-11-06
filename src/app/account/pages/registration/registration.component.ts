import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

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

  submit(): void {
    if(this.regForm.valid)
      console.log(this.regForm.value)
    else 
      console.log('invalid')
  }
}
