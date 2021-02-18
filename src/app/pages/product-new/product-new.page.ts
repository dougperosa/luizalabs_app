import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

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

  constructor(private productService: ProductService, private location: Location, private alertController: AlertController) {
    // this.newProduct();
  }

  ngOnInit() {
  }

  newProduct() {
    if (this.title != null && this.category != null && this.description != null && this.price != null) {
      const data: any = {
        title: this.title,
        category: this.category,
        description: this.description,
        price: this.price.replace('.', '').replace(',', '.'),
        active: true
      };

      this.productService.createProduct(data).subscribe();
      this.alertConfirm("Sucesso", "Cadastro efetuado com sucesso!", true);
    } else {
      this.alertConfirm("Ops", "Preencha todos os campos para efetuar o cadastro!", false);
    }
  }

  async alertConfirm(subtitle: string, msg: string, success: boolean) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: subtitle,
      message: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (success) {
            this.location.back();
          }
        }
      }]
    });

    await alert.present();
  }

}
