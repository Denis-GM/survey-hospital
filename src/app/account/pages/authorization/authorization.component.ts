import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  readonly testForm = new FormGroup({
    testValue1: new FormControl(''),
    testValue2: new FormControl(''),
});
}
