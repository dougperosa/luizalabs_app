import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  results: Observable<any>;

  public searchTitle = null;
  public searchCategory = null;

  constructor(private productService: ProductService) {
  }

  ionViewDidEnter(){
    this.results = this.productService.readProducts();
  }

  ngOnInit() {
    
  }

  getFormattedPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

  searchChanged() {
    if (this.searchTitle != null && this.searchCategory != null) {
      this.results = this.productService.readProductsByAllFilters(this.searchTitle, this.searchCategory);
    } else if (this.searchTitle != null) {
      this.results = this.productService.readProductsByTitle(this.searchTitle);
    } else if (this.searchCategory != null) {
      this.results = this.productService.readProductsByCategory(this.searchCategory);
    } else {
      this.results = this.productService.readProducts();
    }
  }

}
