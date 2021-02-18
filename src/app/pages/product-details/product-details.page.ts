import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  private id = this.activatedRoute.snapshot.paramMap.get('id');

  public information = null;

  public title = null;
  public category = null;
  public description = null;
  public price = null;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private alertController: AlertController, private location: Location) { }

  ngOnInit() {
    this.productService.getDetails(this.id).subscribe(result => {
      this.information = result;
      this.title = this.information.title;
      this.category = this.information.category;
      this.description = this.information.description;
      this.price = this.getFormattedPrice(this.information.price).replace('R$', '');
    });
  }

  ionViewDidEnter() {
    
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

  getFormattedPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

  editProduct() {
    if (this.title != null && this.category != null && this.description != null && this.price != null) {
      const data: any = {
        id: this.id,
        title: this.title,
        category: this.category,
        description: this.description,
        price: this.price.replace('.', '').replace(',', '.'),
        active: true
      };

      this.productService.updateProduct(data).subscribe();
      this.alertConfirm("Sucesso", "Cadastro alterado com sucesso!", true);
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

  async alertConfirmDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta de Confirmação',
      message: 'Tem certeza que deseja <strong>excluir</strong> este produto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.productService.deleteProduct(this.id).subscribe();
            this.alertConfirm("Sucesso", "Cadastro deletado com sucesso!", true);
          }
        }
      ]
    });

    await alert.present();
  }

}
