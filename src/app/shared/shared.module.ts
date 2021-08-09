import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditProductComponent } from './components/create-edit-product/create-edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateEditProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents:[CreateEditProductComponent]
})
export class SharedModule { }
