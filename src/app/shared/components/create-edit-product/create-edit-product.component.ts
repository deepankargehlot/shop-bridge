import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss']
})
export class CreateEditProductComponent implements OnInit {

  edit:boolean = false;

  action:EventEmitter<string> = new EventEmitter<string>();

  product! :product;

  constructor(private modalRef:BsModalRef, private productService:ProductsService) { }

  ngOnInit(): void {
    this.setProductData();
  }

  setProductData() {
    if(this.product) {
      this.productForm.patchValue({
        title:this.product.title, 
        description:this.product.description,
        price:this.product.price
      })
    }
    }

  productForm = new FormGroup({
    title: new FormControl(null),
    description: new FormControl(null),
    price:new FormControl(null),

  });

  closeModal() {
    this.modalRef.hide();
  }

  createEditProduct() {
    if(this.edit) {
      this.editProduct()
    } else {
      this.createProduct()
    }
  }

  createProduct() {
    this.productService.addProduct(this.productForm.getRawValue()).subscribe((product) => {
      this.action.emit('create')
    })
    
  }

  editProduct() {
    if(this.product.id) {
      this.productService.modifyProduct(this.product.id,this.productForm.getRawValue()).subscribe((product) => {
        this.action.emit('edit');
      });
    }
    
  }


}
