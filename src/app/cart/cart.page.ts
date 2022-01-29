import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  data: Product[] = [];
  cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private fbauth: AngularFireAuth,
    public ngroute: Router
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.productprice * j.amount, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async doLogout(): Promise<void> {
    await this.fbauth.signOut().then(() => {
      this.ngroute.navigate(['login']);
    });
  }
}
