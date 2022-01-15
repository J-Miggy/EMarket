import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }
  form = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl(''),
    password: new FormControl('')
  });
}
