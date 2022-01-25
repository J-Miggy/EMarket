import { Component, OnInit, ElementRef , ViewChild } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController, ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CartService } from '../services/cart.service';
import { CartPage } from '../cart/cart.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  public productlist = [];
  public isLoading: any;

  //Added image
  items: Observable<any[]>;
  
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(
    
    private toastservice: ToastService,
    private cartService: CartService,
    private modalCtrl: ModalController,

    public ngroute: Router,
    private fbstore: AngularFirestore,
    public alertcontrol: AlertController,
    private fbauth: AngularFireAuth) {
    }

    // boundary
  async getProducts(){
    try{
      await this.fbstore.collection("products").snapshotChanges()
      .subscribe(data => {
        //console.log(data);
        this.productlist = data.map(result => {
          //console.log(result)
          
          return {
            docid: result.payload.doc.id,
            producttitle: result.payload.doc.data()["pt"],
            productprice: result.payload.doc.data()["pp"],
            productdesc: result.payload.doc.data()["pd"]
          }

        });

        /* remove later only for delaying loading of products list to show animation for a longer duration */
        of(data).pipe(
          delay(1000)
        ).subscribe((data) => {this.isLoading = false;});

      });
    }catch(error){
      this.toastservice.showToast(error.message, 2000);
      //console.log(error.message);
    }
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.getProducts();
  }

  async deleteConfirmproduct(docid: string) {
    const alert = await this.alertcontrol.create({
      cssClass: 'alt',
      header: 'Confirm Delete',
      message: 'Are you sure you want delete this ' + docid +  ' product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.fbstore.doc("products/" + docid).delete().then(data => {
              this.ngroute.navigate(['home']);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async doLogout(): Promise<void> {
    await this.fbauth.signOut().then(() => {
      this.ngroute.navigate(['login']);
    });
  }

ngOnInit(){
     this.products = this.cartService.getProducts();
      this.cart = this.cartService.getCart();
      this.cartItemCount = this.cartService.getCartItemCount();
}
addToCart(product){
  this.cartService.addProduct(product);
  this.animateCSS('tada');

}

async openCart() {
  this.animateCSS('bounceOutLeft', true);

  let modal = await this.modalCtrl.create({
    component: CartPage,
    cssClass: 'cart'
  });
  modal.onWillDismiss().then(() => {
    this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    this.animateCSS('bounceInLeft');
  });
  modal.present();
}

animateCSS(animationName, keepAnimated = false) {
  const node = this.fab.nativeElement;
  node.classList.add('animated', animationName)
  
  //https://github.com/daneden/animate.css
  function handleAnimationEnd() {
    if (!keepAnimated) {
      node.classList.remove('animated', animationName);
    }
    node.removeEventListener('animationend', handleAnimationEnd)
  }
  node.addEventListener('animationend', handleAnimationEnd)
}



}
