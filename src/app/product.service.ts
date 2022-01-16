import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as firebase from 'firebase/compat/app';
import 'firebase/firestore'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


const CART_STORAGE_KEY = 'MY_CART';
const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.inrecrement(-1);

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cart = new BehaviorSubject({});
  cartKey= null;
  productsCollection: AngularFirestoreCollection;
  
  constructor(
  private afs: AngularFirestore
  ) {
    this.productsCollection = this.afs.collection('products');
    this.loadCart();
   }

   getProducts(){
     return this.productsCollection.valueChanges({idField: 'id'});
   }

   async loadCart(){
     const result = await Storage.get({ key: CART_STORAGE_KEY });
     console.log('Cart from storage: ', result);
     
      if (result.value) {
        // You already have a cart
        this.cartKey= result.value;

          this.afs.collection('carts').doc(this.cartKey).valueChanges().subscribe((result: any) => {

            delete result['lastupdate'];
            console.log('cart changed: ', result);
            this.cart.next(result || {});
          });
          
      } else{
        const fbDocument = await this.afs.collection('carts').add({
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('new cart: ', fbDocument);
        this.cartKey = fbDocument.id;
        await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey });
      }
   }

   // Add something to the cart the logic "You already have a cart" runs
  addToCart(id){
      this.afs.collection('carts').doc(this.cartKey).update({
        [id]: INCREMENT,
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
      });

      this.productsCollection.doc(id).update({
        stock: DECREMENT
      });
  }
  removeFromCart(id){
    this.afs.collection('carts').doc(this.cartKey).update({
      [id]: DECREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    this.productsCollection.doc(id).update({
      stock: INCREMENT
    });
  }
  async checkoutCart(){
    await this.afs.collection('orders').add(this.cart.value);

    this.afs.collection('carts').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

  }
    
  }
     
   
    
}
