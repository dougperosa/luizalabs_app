import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.page.html',
  styleUrls: ['./product-new.page.scss'],
})
export class ProductNewPage implements OnInit {

  public title = null;
  public category = null;
  public description = null;
  public price = null;

  constructor(private productService: ProductService, private location: Location) { 
    // this.newProduct();
  }

  ngOnInit() {
  }

  newProduct(){
    const data: any = {
      title: this.title,
      category: this.category,
      description: this.description,
      price: this.price.replace('.','').replace(',','.'),
      active: true
    };

    this.productService.createProduct(data).subscribe();
    this.location.back();
  }

}
