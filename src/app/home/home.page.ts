import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private productService: ProductService
    ) {}


    ngOnInit() {
    this.productService.getProducts().subscribe(res =>{
      console.log('my product: ', res);
    });
    

    }
  
}
