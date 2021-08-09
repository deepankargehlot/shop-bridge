import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAdminRoutingModule } from './product-admin-routing.module';
import { ProductAdminComponent } from './product-admin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ProductAdminComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    SharedModule,
    ProductAdminRoutingModule
  ]
})
export class ProductAdminModule { }
