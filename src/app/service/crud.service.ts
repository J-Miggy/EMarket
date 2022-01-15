import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  

  Email:any;
  Password:any;
  Name:any;
  
  constructor(
    private angularFirestore:AngularFirestore
    ) { }

  

  

}
