import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrMaskerModule } from 'br-mask';

import { IonicModule } from '@ionic/angular';

import { ProductNewPageRoutingModule } from './product-new-routing.module';

import { ProductNewPage } from './product-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductNewPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [ProductNewPage]
})
export class ProductNewPageModule {}
