import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  publicEmail:any;
  publicPassword:any;
  publicName:any;

  constructor(
    crudservice:CrudService
   
  ) { }

  ngOnInit() {
  }



  
}
